"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Button from '@/components/ui/Button';

const schema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().email().required(),
  message: yup.string().required().min(10)
});

type FormValues = yup.InferType<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (values: FormValues) => {
    try {
      // Placeholder: integrate with API route or external service
      await new Promise((res) => setTimeout(res, 800));
      console.log('Form submission', values);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
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
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
        {status === 'success' && (
          <p className="text-sm text-green-600">Message sent successfully!</p>
        )}
        {status === 'error' && <p className="text-sm text-red-600">Error sending message.</p>}
      </div>
    </form>
  );
}
