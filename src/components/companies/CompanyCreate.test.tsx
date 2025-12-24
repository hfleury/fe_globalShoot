import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Admin, Resource } from 'react-admin';
import { CompanyCreate } from './CompanyCreate';
import { describe, it, expect, vi } from 'vitest';

// Mock data provider
const dataProvider: any = {
    create: vi.fn(() => Promise.resolve({ data: { id: 123 } })),
    delete: vi.fn(() => Promise.resolve({ data: { id: 123 } })),
    deleteMany: vi.fn(() => Promise.resolve({ data: [] })),
    getList: vi.fn(() => Promise.resolve({ data: [], total: 0 })),
    getMany: vi.fn(() => Promise.resolve({ data: [] })),
    getManyReference: vi.fn(() => Promise.resolve({ data: [], total: 0 })),
    getOne: vi.fn(() => Promise.resolve({ data: { id: 123 } })),
    update: vi.fn(() => Promise.resolve({ data: { id: 123 } })),
    updateMany: vi.fn(() => Promise.resolve({ data: [] })),
};

describe('CompanyCreate', () => {
    it('should submit form with correct data', async () => {
        // Force navigation to create page
        window.location.hash = '#/companies/create';

        render(
            <Admin dataProvider={dataProvider}>
                <Resource name="companies" list={() => <span>List</span>} create={CompanyCreate} />
            </Admin>
        );

        // Wait for inputs
        const nameInput = await screen.findByLabelText(/name/i);
        const emailInput = await screen.findByLabelText(/email/i);
        const passwordInput = await screen.findByLabelText(/password/i);

        expect(nameInput).toBeDefined();

        fireEvent.change(nameInput, { target: { value: 'Test Company' } });
        fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        const saveButton = await screen.findByText(/save/i);
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(dataProvider.create).toHaveBeenCalledWith('companies', {
                data: {
                    name: 'Test Company',
                    email: 'admin@test.com',
                    password: 'password123',
                },
            });
        });
    });
});
