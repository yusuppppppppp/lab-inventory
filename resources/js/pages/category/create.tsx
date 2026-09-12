import CategoryController from '@/actions/App/Http/Controllers/CategoryController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';

export default function Create() {
    return (
        <>
            <Head title="Create Category" />
            <section className="max-w-xl p-10">
                <h1 className="text-accent-foreground text-2xl font-bold capitalize">
                    create category
                </h1>
                <Form
                    {...CategoryController.store.form()}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div>
                                <Label>Name</Label>
                                <Input name="name" required />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input name="description" />
                                <InputError message={errors.description} />
                            </div>
                            <Button disabled={processing}>Save</Button>
                        </>
                    )}
                </Form>
            </section>
        </>
    );
}
