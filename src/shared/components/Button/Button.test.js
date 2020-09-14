import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Button from './Button';

afterEach(cleanup);

describe('<Button />', () => {
    it('It should contain text "Submit"', () => {
        const { getByText } = render(<Button>Submit</Button>);

        getByText(/Submit/);
    });

    it('It should be disabled', () => {
        const { getByText } = render(<Button disabled>Submit</Button>);

        const button = getByText(/Submit/);

        expect(button).toBeDisabled();
    });

    it('It should have type "button" by defolt', () => {
        const { getByText } = render(<Button>Submit</Button>);

        const button = getByText(/Submit/);

        expect(button.type).toBe('button');
    });

    it('It should call onClick functio twice', () => {
        const mockOnClick = jest.fn();

        const { getByText } = render(<Button onClick={mockOnClick}>Submit</Button>);

        const button = getByText(/Submit/);

        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
