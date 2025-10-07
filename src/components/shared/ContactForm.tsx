"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

// Expect a public Formspree form ID via env (e.g. NEXT_PUBLIC_FORMSPREE_ID="abcdwxyz")
const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const schema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().email().required(),
  message: yup.string().required().min(10)
});

type FormValues = yup.InferType<typeof schema>;

export default function ContactForm() {
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-clear success after 6s
  useEffect(() => {
    if (status === 'success') {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => setStatus('idle'), 6000);
    }
    return () => { if (successTimerRef.current) clearTimeout(successTimerRef.current); };
  }, [status]);

  const onSubmit = async (values: FormValues) => {
    setStatus('idle');
    setFieldErrors({});

    // Honeypot (bots often fill every field)
    const hp = (document.getElementById('hp-company') as HTMLInputElement | null)?.value;
    if (hp) {
      setStatus('success'); // silently accept to not tip off bots
      return;
    }

    const tryFormspree = async () => {
      if (!formspreeId) return { ok: false, missing: true };
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values)
        });
        const json: any = await res.json().catch(() => ({}));
        if (res.ok) return { ok: true };
        if (json?.errors?.length) {
          const fe: Record<string, string> = {};
          json.errors.forEach((e: any) => { if (e.field) fe[e.field] = e.message; });
          setFieldErrors(fe);
        }
        return { ok: false, error: json };
      } catch (e) {
        console.error('Formspree request failed', e);
        return { ok: false, error: e };
      }
    };

    const primary = await tryFormspree();
    if (primary.ok) {
      setStatus('success');
      reset();
      push({ type: 'success', title: 'Message Sent', message: 'Your message was delivered successfully.' });
      return;
    } else if (primary.error) {
      push({ type: 'error', title: 'Primary Failed', message: 'Trying fallback delivery...' });
    }

    // Fallback to internal API if configured earlier
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('success');
        reset();
        push({ type: 'success', title: 'Delivered', message: 'Sent via fallback mailer.' });
      } else {
        console.error('Fallback contact error', json);
        setStatus('error');
        push({ type: 'error', title: 'Failed', message: 'Could not send message. Please try later.' });
      }
    } catch (e) {
      console.error('Fallback contact fetch failed', e);
      setStatus('error');
      push({ type: 'error', title: 'Network Error', message: 'Connection issue while sending.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-live="polite">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        {!errors.name && fieldErrors.name && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
            {...register('email')}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        {!errors.email && fieldErrors.email && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={5}
          {...register('message')}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40 resize-y"
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
        {!errors.message && fieldErrors.message && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>
        )}
      </div>
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp-company">Company</label>
        <input id="hp-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting || status === 'success'}>
          {isSubmitting ? 'Sending…' : status === 'success' ? 'Sent!' : 'Send Message'}
        </Button>
        {!formspreeId && status !== 'success' && (
          <p className="text-xs text-fg-muted">Using fallback mailer (configure Formspree for direct delivery).</p>
        )}
      </div>
    </form>
  );
}
