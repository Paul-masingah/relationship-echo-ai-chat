
import React from 'react';
import { RelationshipForm } from '@/components/relationships/RelationshipForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddRelationshipPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Add a Relationship</h1>
      <Card>
        <CardHeader>
          <CardTitle>Relationship Details</CardTitle>
        </CardHeader>
        <CardContent>
          <RelationshipForm />
        </CardContent>
      </Card>
    </div>
  );
}
