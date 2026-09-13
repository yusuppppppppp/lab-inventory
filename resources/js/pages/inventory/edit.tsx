import ItemController from '@/actions/App/Http/Controllers/ItemController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

type CategoryOption = {
    id: number;
    name: string;
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

export default function Edit({
    item,
    categories,
}: {
    item: Item;
    categories: CategoryOption[];
}) {
    const [condition, setCondition] = useState<string>(item.condition);
    const [categoryValue, setCategoryValue] = useState(item.category);

    return (
        <>
            <Head title="Edit Item" />
            <section className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center p-4 py-8 sm:p-6">
                <div className="bg-secondary/30 flex w-full max-w-md flex-col items-start justify-start gap-7 rounded-2xl p-6 sm:p-8">
                    <h1 className="text-accent-foreground text-xl font-bold capitalize sm:text-2xl">
                        edit item
                    </h1>
                    <Form
                        {...ItemController.update.form(item.id)}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex h-full w-full flex-col items-start justify-start gap-6 sm:gap-7">
                                    <FieldGroup className="w-full">
                                        <FieldSet className="flex flex-col items-start justify-start gap-5">
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>Code</FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="code"
                                                    placeholder="ITM-0001"
                                                    required
                                                    defaultValue={item.code}
                                                />
                                                <InputError
                                                    message={errors.code}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>Name</FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="name"
                                                    placeholder="Item name..."
                                                    required
                                                    defaultValue={item.name}
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Category
                                                </FieldLabel>
                                                <Select
                                                    value={categoryValue}
                                                    onValueChange={
                                                        setCategoryValue
                                                    }
                                                >
                                                    <SelectTrigger className="bg-secondary/30 border-accent-foreground/30 w-full border border-solid">
                                                        <SelectValue placeholder="Select category..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.length ===
                                                        0 ? (
                                                            <SelectItem
                                                                value="__empty"
                                                                disabled
                                                            >
                                                                No categories
                                                                yet
                                                            </SelectItem>
                                                        ) : (
                                                            categories.map(
                                                                (c) => (
                                                                    <SelectItem
                                                                        key={
                                                                            c.id
                                                                        }
                                                                        value={
                                                                            c.name
                                                                        }
                                                                    >
                                                                        {c.name}
                                                                    </SelectItem>
                                                                ),
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="category"
                                                    value={categoryValue}
                                                />
                                                <InputError
                                                    message={errors.category}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Quantity
                                                </FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="quantity"
                                                    type="number"
                                                    min={0}
                                                    required
                                                    defaultValue={String(
                                                        item.quantity,
                                                    )}
                                                />
                                                <InputError
                                                    message={errors.quantity}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Condition
                                                </FieldLabel>
                                                <Select
                                                    value={condition}
                                                    onValueChange={setCondition}
                                                >
                                                    <SelectTrigger className="bg-secondary border-accent-foreground/30 w-full border border-solid">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="good">
                                                            Good
                                                        </SelectItem>
                                                        <SelectItem value="minor_damage">
                                                            Minor Damage
                                                        </SelectItem>
                                                        <SelectItem value="major_damage">
                                                            Major Damage
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="condition"
                                                    value={condition}
                                                />
                                                <InputError
                                                    message={errors.condition}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Location
                                                </FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="location"
                                                    placeholder="Lab-A-01"
                                                    required
                                                    defaultValue={item.location}
                                                />
                                                <InputError
                                                    message={errors.location}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Received At
                                                </FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="received_at"
                                                    type="date"
                                                    defaultValue={
                                                        item.received_at
                                                            ? item.received_at.substring(
                                                                  0,
                                                                  10,
                                                              )
                                                            : ''
                                                    }
                                                />
                                                <InputError
                                                    message={errors.received_at}
                                                />
                                            </div>
                                        </FieldSet>
                                    </FieldGroup>
                                    <Button disabled={processing}>Save</Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </section>
        </>
    );
}
