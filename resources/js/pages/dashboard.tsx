import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import { create as createCategory } from '@/routes/categories';
import { create as createItem } from '@/routes/items';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Boxes, Layers, Package } from 'lucide-react';

type Stats = {
    totalItems: number;
    totalCategories: number;
    totalQuantity: number;
    lowStock: number;
    condition: {
        good: number;
        minor_damage: number;
        major_damage: number;
    };
};

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

type CategoryDistribution = {
    category: string;
    total: number;
};

export default function Dashboard({
    stats,
    recentItems,
    lowStockItems,
    categoryDistribution,
}: {
    stats: Stats;
    recentItems: Item[];
    lowStockItems: Item[];
    categoryDistribution: CategoryDistribution[];
}) {
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
        minor_damage: 'Minor',
        major_damage: 'Major',
    };

    return (
        <>
            <Head title="Dashboard" />
            <section className="flex w-full flex-col gap-8 p-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-accent-foreground text-2xl font-bold capitalize">
                        Dashboard
                    </h1>
                    <div className="flex gap-3">
                        <Link href={createItem()}>
                            <Button size="sm" className="capitalize">
                                new item
                            </Button>
                        </Link>
                        <Link href={createCategory()}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="capitalize"
                            >
                                new category
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-secondary/30">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                total items
                            </CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalItems}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                All inventory items
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/30">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                total categories
                            </CardTitle>
                            <Boxes className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalCategories}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Active categories
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/30">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                total quantity
                            </CardTitle>
                            <Layers className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalQuantity}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Sum of all stocks
                            </p>
                        </CardContent>
                    </Card>
                    <Card
                        className={
                            stats.lowStock > 0
                                ? 'bg-destructive/10 border-destructive/30'
                                : 'bg-secondary/30'
                        }
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                low stock
                            </CardTitle>
                            <AlertTriangle
                                className={`h-4 w-4 ${stats.lowStock > 0 ? 'text-destructive' : 'text-muted-foreground'}`}
                            />
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`text-2xl font-bold ${stats.lowStock > 0 ? 'text-destructive' : ''}`}
                            >
                                {stats.lowStock}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Items with qty &lt; 5
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium capitalize">
                            condition overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        <Badge variant="default" className="px-3 py-1 text-sm">
                            Good: {stats.condition.good}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="px-3 py-1 text-sm"
                        >
                            Minor Damage: {stats.condition.minor_damage}
                        </Badge>
                        <Badge
                            variant="destructive"
                            className="px-3 py-1 text-sm"
                        >
                            Major Damage: {stats.condition.major_damage}
                        </Badge>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="bg-secondary/30">
                        <CardHeader>
                            <CardTitle className="capitalize">
                                recent items
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>code</TableHead>
                                        <TableHead>name</TableHead>
                                        <TableHead>qty</TableHead>
                                        <TableHead>condition</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-muted-foreground p-8 text-center"
                                            >
                                                No items yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recentItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-mono text-xs">
                                                    {item.code}
                                                </TableCell>
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            conditionVariant[
                                                                item.condition
                                                            ]
                                                        }
                                                        className="text-xs capitalize"
                                                    >
                                                        {
                                                            conditionLabel[
                                                                item.condition
                                                            ]
                                                        }
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card
                        className={
                            lowStockItems.length > 0
                                ? 'bg-destructive/5 border-destructive/20'
                                : 'bg-secondary/30'
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 capitalize">
                                <AlertTriangle className="h-4 w-4" /> low stock
                                alert
                                {lowStockItems.length > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="ml-2"
                                    >
                                        {lowStockItems.length}
                                    </Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                            {lowStockItems.length === 0 ? (
                                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 p-8 text-center">
                                    <div className="bg-secondary rounded-full p-3">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm font-medium">
                                        All stocks safe
                                    </p>
                                    <p className="text-xs">
                                        No items with quantity &lt; 5
                                    </p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>code</TableHead>
                                            <TableHead>name</TableHead>
                                            <TableHead>qty</TableHead>
                                            <TableHead>location</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lowStockItems.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                className={
                                                    item.quantity === 0
                                                        ? 'bg-destructive/10'
                                                        : ''
                                                }
                                            >
                                                <TableCell className="font-mono text-xs">
                                                    {item.code}
                                                </TableCell>
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant={
                                                            item.quantity === 0
                                                                ? 'destructive'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {item.quantity}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {item.location}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="capitalize">
                            category distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {categoryDistribution.length === 0 ? (
                            <p className="text-muted-foreground p-4 text-center text-sm">
                                No data.
                            </p>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {categoryDistribution.map((c) => (
                                    <div
                                        key={c.category}
                                        className="bg-secondary flex items-center justify-between rounded-lg border px-4 py-3"
                                    >
                                        <span className="text-sm font-medium">
                                            {c.category}
                                        </span>
                                        <Badge variant="outline">
                                            {c.total} items
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
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
