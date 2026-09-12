import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <section className="h-full w-full p-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-bold capitalize">Inventory</h1>
                    <form className="bg-accent-foreground rounded-sm p-2">
                        <input
                            type="text"
                            placeholder="Search nama barang, kategori"
                            className="text-secondary"
                        />
                    </form>
                </div>
            </section>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
