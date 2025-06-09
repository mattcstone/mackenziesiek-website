import { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleFormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  description?: string;
  errorSummary?: string[];
  children: ReactNode;
}

export function AccessibleForm({ 
  title, 
  description, 
  errorSummary, 
  children, 
  className,
  ...props 
}: AccessibleFormProps) {
  const hasErrors = errorSummary && errorSummary.length > 0;

  return (
    <form 
      className={cn('space-y-6', className)}
      role="form"
      aria-labelledby="form-title"
      aria-describedby={description ? 'form-description' : undefined}
      noValidate
      {...props}
    >
      <div className="form-header">
        <h2 id="form-title" className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {description && (
          <p id="form-description" className="text-gray-600 mb-4">
            {description}
          </p>
        )}
      </div>

      {hasErrors && (
        <div 
          role="alert" 
          aria-labelledby="error-summary-title"
          className="bg-red-50 border border-red-200 rounded-md p-4 mb-6"
        >
          <h3 id="error-summary-title" className="text-sm font-medium text-red-800 mb-2">
            Please correct the following errors:
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            {errorSummary.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </form>
  );
}

interface AccessibleFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: ReactNode;
}

export function AccessibleField({ 
  label, 
  id, 
  required = false, 
  error, 
  helpText, 
  children 
}: AccessibleFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helpId = helpText ? `${id}-help` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label 
        htmlFor={id} 
        className={cn(
          'block text-sm font-medium mb-2',
          error ? 'text-red-700' : 'text-gray-700'
        )}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      
      <div className="relative">
        {children}
      </div>

      {helpText && (
        <p id={helpId} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}