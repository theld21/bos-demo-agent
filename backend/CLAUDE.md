## WHAT: Project Overview & Tech Stack
Enterprise backend API for BOS project.
- **Framework:** Laravel 10.x
- **Language:** PHP 8.2+
- **Database:** MySQL 8.0+
- **API:** REST with JSON, JWT Bearer authentication
- **ORM:** Eloquent
- **Testing:** PHPUnit

## Project Structure
- `app/Modules/` - Modular architecture (Auth, Products, Orders, etc.)
  - Each module: `{Module}/Routes/api.php`, `Controllers/`, `Models/`, `Requests/`, `Services/`, `Resources/`, `Exceptions/`
- `app/Traits/`, `Filters/`, `Enums/`, `Http/Middleware/`, `Policies/`
- `database/migrations/`, `seeders/`
- `routes/api.php` - Main route registration
- `tests/Feature/`, `tests/Unit/`

## HOW: Key Architecture Patterns
- **Module Independence:** Each module self-contained; cross-module via Services or Events only
- **Controllers:** HTTP request/response only; delegate logic to Services
- **Validation:** Form Requests per action (StoreProductRequest, UpdateProductRequest)
- **Business Logic:** Services encapsulate domain logic; use constructor injection
- **Database:** Eloquent models with relationships, scopes, casts; never DB::raw()
- **API Responses:** Use Resources for transformation; HTTP status codes (200, 201, 204, 400, 401, 403, 404, 422)
- **Async:** Jobs for long tasks; Events for state changes with Listeners
- **Routes:** Resourceful routing per module; auth:api middleware

**Commands:**
```bash
php artisan make:model Modules/Auth/Models/User
php artisan make:controller Modules/Auth/Controllers/AuthController
```

## IMPORTANT Rules
- ✅ Eager load relations (`with()`) to prevent N+1
- ✅ Use Eloquent scopes for reusable filters
- ✅ Queue long tasks; use Events for notifications
- ✅ Transaction for multi-step DB operations
- ✅ Test business logic (services) + API endpoints
- ❌ DO NOT modify committed migrations
- ❌ DO NOT hardcode credentials/secrets
- ❌ DO NOT use `Request::validate()` in controllers
- ❌ DO NOT skip validation or use guarded=[]
- ❌ DO NOT commit `.env` file