# SQL JOIN Examples API

This API demonstrates different types of SQL JOINs using the `customers` and `invoices` tables.

## Available Endpoints

You can test each JOIN type by visiting these URLs in your browser:

### INNER JOIN

```
http://localhost:3000/query?join=inner
```

Shows only matches between customers and their invoices. Returns records where customer IDs exist in both tables.

### LEFT JOIN

```
http://localhost:3000/query?join=left
```

Shows all customers and their invoices (if they have any). Customers without invoices will show null values for invoice fields.

### RIGHT JOIN

```
http://localhost:3000/query?join=right
```

Shows all invoices and their corresponding customer details. If an invoice doesn't match a customer, customer fields will be null.

### FULL JOIN

```
http://localhost:3000/query?join=full
```

Shows all records from both tables, matching where possible. Null values will appear where there is no match in either table.

## Response Format

All endpoints return JSON data with the following structure for each record:

- For INNER/LEFT JOIN:

  ```json
  {
    "id": "customer_id",
    "name": "customer_name",
    "amount": invoice_amount
  }
  ```

- For RIGHT JOIN:

  ```json
  {
    "id": "invoice_id",
    "amount": invoice_amount,
    "name": "customer_name"
  }
  ```

- For FULL JOIN:
  ```json
  {
    "name": "customer_name",
    "amount": invoice_amount
  }
  ```

## Error Handling

If something goes wrong, the API will return a 500 status code with an error object:

```json
{
  "error": "error_details"
}
```

If no join type is specified, you'll get instructions on how to use the API:

```json
{
  "message": "Specify join type in query parameter: ?join=inner|left|right|full",
  "example": "/query?join=inner"
}
```
