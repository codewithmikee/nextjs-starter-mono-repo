import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  label?: string;
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, name, className, registration, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`radio-button-container ${className}`}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className='radio-button'>
            <input
              type='radio'
              id={`${name}-${option.value}`}
              className='radio-button__input'
              value={option.value}
              {...registration}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className='radio-button__label'
            >
              <span className='radio-button__custom' />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// CSS styles (should be imported or placed in a CSS module)
const styles = `
.radio-button-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.radio-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button__label {
  display: inline-block;
  padding-left: 30px;
  margin-bottom: 10px;
  position: relative;
  font-size: 15px;
  color: #f2f2f2;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.radio-button__custom {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  transition: all 0.3s ease;
}

.radio-button__input:checked + .radio-button__label .radio-button__custom {
  background-color: #4c8bf5;
  border-color: transparent;
  transform: scale(0.8);
  box-shadow: 0 0 20px #4c8bf580;
}

.radio-button__input:checked + .radio-button__label {
  color: #4c8bf5;
}

.radio-button__label:hover .radio-button__custom {
  transform: scale(1.2);
  border-color: #4c8bf5;
  box-shadow: 0 0 20px #4c8bf580;
}
`;

// Helper component to inject styles
export function RadioGroupStyles() {
  return <style>{styles}</style>;
}
