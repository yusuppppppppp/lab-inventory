import { Badge } from '@/components/ui/badge';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { create, destroy, edit, index } from '@/routes/items';
import { Head, Link, router } from '@inertiajs/react';

type Item = {
    id: number;
    code: string;
    name: string;
    category: string;
    quantity: number;
    condition: 'good' | 'minor_damage' | 'major_damage';
    location: string;
    received_at: string | null;
};

type PaginatedItems = {
    data: Item[];
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

const conditionVariant: Record<
    Item['condition'],
    'default' | 'secondary' | 'destructive'
> = {
    good: 'default',
    minor_damage: 'secondary',
    major_damage: 'destructive',
};

const conditionLabel: Record<Item['condition'], string> = {
    good: 'Good',
    minor_damage: 'Minor Damage',
    major_damage: 'Major Damage',
};

export default function InventoryIndex({ items }: { items: PaginatedItems }) {
    return (
        <>
            <Head title="Inventory" />
            <section className="flex w-full flex-col justify-stretch gap-6 p-4 sm:gap-8 sm:p-6 lg:p-10">
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-accent-foreground text-xl font-bold capitalize sm:text-2xl">
                        Inventory
                    </h1>
                    <div className="flex w-full items-start justify-end sm:w-auto">
                        <Link href={create()} className="w-full sm:w-auto">
                            <Button className="w-full capitalize sm:w-auto">
                                new item
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-sm border">
                    <Table className="min-w-[800px] overflow-hidden">
                        <TableHeader className="bg-secondary">
                            <TableRow>
                                <TableHead className="capitalize">
                                    code
                                </TableHead>
                                <TableHead className="capitalize">
                                    name
                                </TableHead>
                                <TableHead className="capitalize">
                                    category
                                </TableHead>
                                <TableHead className="capitalize">
                                    qty
                                </TableHead>
                                <TableHead className="capitalize">
                                    condition
                                </TableHead>
                                <TableHead className="capitalize">
                                    location
                                </TableHead>
                                <TableHead className="capitalize">
                                    received at
                                </TableHead>
                                <TableHead className="capitalize">
                                    action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-muted-foreground p-8 text-center"
                                    >
                                        No items found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.data.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="border-t"
                                    >
                                        <TableCell className="bg-secondary/30 font-mono text-xs">
                                            {item.code}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 w-[15%] text-sm">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 text-sm">
                                            {item.category}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 text-center text-sm">
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30">
                                            <Badge
                                                variant={
                                                    conditionVariant[
                                                        item.condition
                                                    ]
                                                }
                                                className="text-xs capitalize"
                                            >
                                                {conditionLabel[item.condition]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 text-sm">
                                            {item.location}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30 text-xs">
                                            {item.received_at
                                                ? new Date(
                                                      item.received_at,
                                                  ).toLocaleDateString('id-ID')
                                                : '-'}
                                        </TableCell>
                                        <TableCell className="bg-secondary/30">
                                            <div className="flex flex-wrap gap-2">
                                                <Link href={edit(item.id)}>
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
                                                            destroy(item.id),
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

                {items.last_page > 1 && (
                    <div className="flex max-w-full flex-col items-center gap-4 overflow-x-auto">
                        <Pagination className="max-w-full">
                            <PaginationContent className="flex-wrap justify-center">
                                <PaginationItem>
                                    {items.prev_page_url ? (
                                        <Link
                                            href={items.prev_page_url}
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

                                {items.links.slice(1, -1).map((link, idx) => {
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
                                                            variant: link.active
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
                                    {items.next_page_url ? (
                                        <Link
                                            href={items.next_page_url}
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

InventoryIndex.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: index(),
        },
    ],
};
