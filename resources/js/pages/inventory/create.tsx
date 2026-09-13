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

export default function Create({
    categories,
}: {
    categories: CategoryOption[];
}) {
    const [condition, setCondition] = useState('good');
    const [categoryValue, setCategoryValue] = useState('');

    return (
        <>
            <Head title="Create Item" />
            <section className="flex h-full w-full flex-col items-center justify-center py-8">
                <div className="bg-secondary/30 flex flex-col items-start justify-start gap-7 rounded-2xl p-8">
                    <h1 className="text-accent-foreground text-2xl font-bold capitalize">
                        create item
                    </h1>
                    <Form
                        {...ItemController.store.form()}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex h-full w-full flex-col items-start justify-start gap-7">
                                    <FieldGroup className="w-85">
                                        <FieldSet className="flex flex-col items-start justify-start gap-5">
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>Code</FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="code"
                                                    placeholder="ITM-0001"
                                                    required
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
                                                    placeholder="0"
                                                    required
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
                                                />
                                                <InputError
                                                    message={errors.received_at}
                                                />
                                            </div>
                                        </FieldSet>
                                    </FieldGroup>
                                    <Button disabled={processing}>
                                        Create
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </section>
        </>
    );
}
