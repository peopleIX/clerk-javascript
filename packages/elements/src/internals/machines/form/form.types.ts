import type { ClerkElementsFieldError } from '~/internals/errors/error';

export type FieldDetails = {
  name?: string;
  value?: string | readonly string[] | number;
  errors?: ClerkElementsFieldError[];
};

export type FormFields = Map<string, FieldDetails>;
