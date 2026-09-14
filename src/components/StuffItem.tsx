"use client";

import { Button } from 'react-bootstrap';
import { Stuff } from '@prisma/client';
import Link from 'next/link';
import { Trash } from 'react-bootstrap-icons';
import { deleteStuff } from '@/lib/dbActions';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const StuffItem = ({ name, quantity, condition, id }: Stuff) => {
  const removeItem = async (id: number) => {
    await deleteStuff(id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{condition}</td>
      <td>
        <Link href={`/edit/${id}`}>Edit</Link>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => removeItem(id)}
        >
          <Trash />
        </Button>
      </td>
    </tr>
  );
};

export default StuffItem;