import { Button, buttonVariants } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
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

type PaginatedCategories = {
    data: Category[];
    current_page: number;
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

export default function CategoryIndex({
    categories,
}: {
    categories: PaginatedCategories;
}) {
    return (
        <>
            <Head title="Inventory" />
            <section className="flex w-full flex-col justify-stretch gap-6 p-4 sm:gap-8 sm:p-6 lg:p-10">
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-accent-foreground text-xl font-bold capitalize sm:text-2xl">
                        Category
                    </h1>
                    <div className="flex w-full items-start justify-end sm:w-auto">
                        <Link href={create()} className="w-full sm:w-auto">
                            <Button className="w-full capitalize sm:w-auto">
                                new category
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-sm border">
                    <Table className="min-w-[600px] overflow-hidden">
                        <TableHeader className="bg-secondary">
                            <TableRow>
                                <TableHead className="capitalize">
                                    name
                                </TableHead>
                                <TableHead className="capitalize">
                                    description
                                </TableHead>
                                <TableHead className="capitalize">
                                    action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-muted-foreground p-8 text-center"
                                    >
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.data.map((c) => (
                                    <TableRow key={c.id} className="border-t">
                                        <TableCell className="bg-secondary/30 w-[30%] text-sm">
                                            {c.name}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 w-[40%] text-sm">
                                            {c.description ?? '-'}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30">
                                            <div className="flex flex-wrap gap-2">
                                                <Link href={edit(c.id)}>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="capitalize"
                                                    >
                                                        edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() =>
                                                        router.delete(
                                                            destroy(c.id),
                                                        )
                                                    }
                                                    variant="destructive"
                                                    size="sm"
                                                    className="capitalize"
                                                >
                                                    delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {categories.last_page > 1 && (
                    <div className="flex max-w-full flex-col items-center gap-4 overflow-x-auto">
                        <Pagination className="max-w-full">
                            <PaginationContent className="flex-wrap justify-center">
                                <PaginationItem>
                                    {categories.prev_page_url ? (
                                        <Link
                                            href={categories.prev_page_url}
                                            preserveScroll
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'ghost',
                                                    size: 'default',
                                                }),
                                                'gap-1 px-2.5 sm:pl-2.5',
                                            )}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m15 18-6-6 6-6" />
                                            </svg>
                                            <span className="hidden sm:block">
                                                Previous
                                            </span>
                                        </Link>
                                    ) : (
                                        <PaginationPrevious
                                            href="#"
                                            className="pointer-events-none opacity-50"
                                        />
                                    )}
                                </PaginationItem>

                                {categories.links
                                    .slice(1, -1)
                                    .map((link, idx) => {
                                        // Handle ellipsis
                                        if (link.label.includes('...')) {
                                            return (
                                                <PaginationItem key={idx}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );
                                        }

                                        return (
                                            <PaginationItem key={idx}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        preserveScroll
                                                        className={cn(
                                                            buttonVariants({
                                                                variant:
                                                                    link.active
                                                                        ? 'outline'
                                                                        : 'ghost',
                                                                size: 'icon',
                                                            }),
                                                        )}
                                                    >
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={link.active}
                                                        className="pointer-events-none opacity-50"
                                                    >
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        );
                                    })}

                                <PaginationItem>
                                    {categories.next_page_url ? (
                                        <Link
                                            href={categories.next_page_url}
                                            preserveScroll
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'ghost',
                                                    size: 'default',
                                                }),
                                                'gap-1 px-2.5 sm:pr-2.5',
                                            )}
                                        >
                                            <span className="hidden sm:block">
                                                Next
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <PaginationNext
                                            href="#"
                                            className="pointer-events-none opacity-50"
                                        />
                                    )}
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
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
