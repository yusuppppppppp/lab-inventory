import CategoryController from '@/actions/App/Http/Controllers/CategoryController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, Head } from '@inertiajs/react';

type Category = { id: number; name: string; description: string | null };

export default function Edit({ category }: { category: Category }) {
    return (
        <>
            <Head title="Edit Category" />
            <section className="flex h-full w-full flex-col items-center justify-center">
                <div className="bg-secondary/30 flex flex-col items-start justify-start gap-7 rounded-2xl p-8">
                    <h1 className="text-accent-foreground text-2xl font-bold capitalize">
                        edit category
                    </h1>
                    <Form
                        {...CategoryController.update.form(category.id)}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex h-full w-full flex-col items-start justify-start gap-7">
                                    <FieldGroup className="w-85">
                                        <FieldSet className="flex flex-col items-start justify-start gap-5">
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>Name</FieldLabel>
                                                <Input
                                                    className="bg-secondary/30 border-accent-foreground/30 border border-solid"
                                                    name="name"
                                                    placeholder="Category name..."
                                                    required
                                                    defaultValue={category.name}
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>
                                            <div className="flex w-full flex-col items-start justify-start gap-3">
                                                <FieldLabel>
                                                    Description
                                                </FieldLabel>
                                                <Textarea
                                                    className="bg-secondary border-accent-foreground/30 border border-solid"
                                                    name="description"
                                                    rows={4}
                                                    placeholder="Category description..."
                                                    defaultValue={
                                                        category.description ??
                                                        ''
                                                    }
                                                />
                                                <InputError
                                                    message={errors.description}
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
