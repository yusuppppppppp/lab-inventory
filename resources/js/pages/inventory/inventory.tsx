import { Head } from '@inertiajs/react';
import { inventory } from '@/routes';

export default function Inventory() {
    return (
        <>
            <Head title="Inventory" />
            <h1>ASEK</h1>
        </>
    );
}

Inventory.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: inventory(),
        },
    ],
};
