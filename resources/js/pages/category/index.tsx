import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { create, destroy, edit, index } from '@/routes/categories';
import { Head, Link, router } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
    description: string | null;
};

export default function CategoryIndex({
    categories,
}: {
    categories: Category[];
}) {
    return (
        <>
            <Head title="Inventory" />
            <section className="flex w-full flex-col justify-stretch gap-15 p-10">
                <div className="flex w-full flex-col justify-between gap-10 align-top">
                    <h1 className="text-accent-foreground text-2xl font-bold capitalize">
                        Category
                    </h1>
                    <div className="flex w-full items-start justify-end">
                        <Link href={create()}>
                            <Button className="capitalize">new category</Button>
                        </Link>
                    </div>
                </div>

                <Table className="overflow-hidden rounded-sm">
                    <TableHeader className="bg-secondary">
                        <TableRow>
                            <TableHead className="pl-3 capitalize">
                                name
                            </TableHead>
                            <TableHead className="capitalize">
                                description
                            </TableHead>
                            <TableHead className="capitalize">action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((c) => (
                            <TableRow key={c.id} className="border-t">
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.description ?? '-'}</TableCell>
                                <TableCell className="flex gap-5 p-2">
                                    <Link href={edit(c.id)}>
                                        <Button className="capitalize">
                                            edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() =>
                                            router.delete(destroy(c.id))
                                        }
                                        className="capitalize"
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </>
    );
}

CategoryIndex.layout = {
    breadcrumbs: [
        {
            title: 'Category',
            href: index(),
        },
    ],
};
