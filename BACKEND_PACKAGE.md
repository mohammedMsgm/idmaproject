# Backend Package.json (Optional)

If you want to deploy the backend separately with its own package.json, create this file:

```json
{
  "name": "idma-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/pg": "^8.15.4",
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.16.2"
  }
}
```

However, since you already have everything in the main package.json, you can deploy using the existing structure.
