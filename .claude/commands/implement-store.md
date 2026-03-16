## Overview

Implement the ecommerce store based on the approved PLAN.md.

## Prerequisites

- PLAN.md must exist in the project root
- User has reviewed and approved the plan
- PostgreSQL and Redis are running (via Docker or local)

## Implementation Steps

### 1. Read and Validate Plan

Read `PLAN.md` and verify it contains:
- Store overview and specifications
- Medusa configuration details
- Storefront layout and design
- Theme customization tokens
- Implementation phases

### 2. Configure Medusa Backend

Spawn the `medusa-configurator` agent to:
- Edit `backend/medusa-config.ts`
- Add regions with currencies
- Configure payment providers (Stripe)
- Set up fulfillment providers
- Create product types and categories (if needed)
- Set up workflows (if needed)

### 3. Customize Storefront

Spawn the `storefront-generator` agent to:
- Customize the existing `storefront/` directory based on PLAN.md
- Configure Medusa client connection
- Update environment variables
- Create/update pages based on plan
- **IMPORTANT**: Edit files in place, do NOT copy or create new directories

### 4. Customize Theme

Spawn the `theme-customizer` agent to:
- Apply color palette to Tailwind config
- Configure typography
- Update spacing and border radius
- Apply theme tokens throughout

### 5. Type Check (MANDATORY!)

**CRITICAL:** Before validation, verify no TypeScript errors exist.

```bash
# Type check all workspaces
make type-check
```

**If type check fails:**
- ❌ **STOP immediately**
- ❌ Read the TypeScript errors
- ❌ Fix the issues in the generated code
- ❌ Re-run `make type-check`
- ❌ **DO NOT proceed to validation until type check passes**

**Only proceed to validation after:**
```
✅ Type check passed with zero errors
```

### 6. Automated Testing & Validation (CRITICAL!)

**IMPORTANT:** Implementation is NOT complete until all validation tests pass.

#### 6.1: Verify Services Running

**Note:** Services should already be running via `make dev` with hot reload enabled. Changes from agents are automatically picked up.

Just verify they're healthy:

```bash
# Check backend health
curl -s http://localhost:9000/health || echo "⚠️ Backend not running"

# Check storefront
curl -s http://localhost:3000 > /dev/null && echo "✅ Storefront running" || echo "⚠️ Storefront not running"

# Check logs for errors
make tail-logs | head -20
```

If services aren't running, start them:
```bash
make dev
sleep 10  # Wait for services to be ready
```

#### 6.2: Run Comprehensive Validation

**Spawn the `store-validator` agent** to test:

1. **Infrastructure Tests** (3 tests)
   - Backend health check
   - Admin dashboard access
   - Storefront running

2. **Product API Tests** (3 tests)
   - Products endpoint returns data
   - **CRITICAL:** Variants have prices (`calculated_price` not null)
   - Product retrieval by handle

3. **Cart Workflow Tests** (5 tests)
   - Create cart
   - Add item to cart
   - Update quantity
   - Remove item
   - Retrieve cart

4. **Region Tests** (2 tests)
   - List regions
   - Get region by ID

5. **Storefront Tests** (3 tests)
   - Homepage loads
   - Product pages load
   - No JavaScript errors

6. **E2E Customer Journey** (1 comprehensive test)
   - Browse products → view details → create cart → add item → update quantity → remove item

7. **Page Availability Tests** (17 tests) ⭐ NEW
   - All 17 mandatory pages exist and return 200
   - Homepage, Products, Product Detail, Collections, Cart, Checkout, etc.
   - Account pages (Dashboard, Orders, Addresses)
   - Static pages (About, Contact, Shipping, FAQ, Privacy, Terms)

8. **Navigation Link Tests** (5 tests) ⭐ NEW
   - All header links work (no 404s)
   - All footer links work (no 404s)
   - All homepage links work
   - No broken internal links found

**Total:** 39 comprehensive tests

#### 6.3: Validation Results

**If ALL tests pass (39/39):**
- ✅ Implementation successful
- ✅ Store is ready for use
- ✅ **All pages exist (no 404s)**
- ✅ **No broken links**
- ✅ Proceed to completion report

**If ANY test fails:**
- ❌ **STOP immediately**
- ❌ Read error details from validator agent
- ❌ Fix the underlying issue
- ❌ Re-run validation
- ❌ **DO NOT report completion until all 39 tests pass**

**Common failures and fixes:**

| Failure | Cause | Fix |
|---------|-------|-----|
| `calculated_price: null` | Variants not linked to price sets | Re-run initialization script using correct Medusa v2 pattern (see `.claude/knowledge/medusa-v2-architecture.md`) |
| "Variants do not have a price" | Same as above | Same as above |
| Products not found | Initialization script not run | Run `npx medusa exec ./src/admin/initialize-store.ts` |
| Cart creation fails | Region not configured | Check initialization script created region |
| 401 Unauthorized | Publishable key not configured | Create API key and update `.env.local` |
| **Page returns 404** ⭐ NEW | **Page not created** | **Create the missing page in `app/` directory** |
| **Broken link in navigation** ⭐ NEW | **Linked page doesn't exist** | **Either create the page or remove the link** |
| **Collections page 404** ⭐ NEW | **Collections not created** | **Run initialization script to create collections** |

### 7. Report Completion (Only After Validation Passes!)

**ONLY provide this report if validation passed 39/39 tests.**

Provide user with:

```markdown
## Store Implementation Complete! ✅

**Store ID**: {store-id}
**Location**: `storefront/` (in-place customization)

### ✅ Validation Results

**ALL TESTS PASSED (39/39)**

| Test Suite | Status |
|------------|--------|
| Infrastructure (3 tests) | ✅ PASS |
| Products API (3 tests) | ✅ PASS |
| Cart Workflow (5 tests) | ✅ PASS |
| Regions (2 tests) | ✅ PASS |
| Storefront (3 tests) | ✅ PASS |
| E2E Journey (1 test) | ✅ PASS |
| **Page Availability (17 tests)** ⭐ NEW | ✅ PASS |
| **Navigation Links (5 tests)** ⭐ NEW | ✅ PASS |

**Critical Checks:**
- ✅ Products have prices (`calculated_price` populated)
- ✅ Cart operations work (create, add, update, remove)
- ✅ Region and sales channel configured
- ✅ Publishable API key working
- ✅ Complete customer journey works end-to-end
- ✅ **All 17 pages exist (no 404 errors)** ⭐ NEW
- ✅ **No broken navigation links** ⭐ NEW
- ✅ **Collections and categories accessible** ⭐ NEW

### Services Running

- **Medusa Backend**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app (Login: admin@{store}.com / supersecret123)
- **Storefront**: http://localhost:3000

### What Works Right Now

**Core Shopping:**
✅ Browse products on storefront
✅ View product details with prices
✅ Browse collections (GPU tiers, price ranges, brands)
✅ Add products to cart
✅ Update cart quantities
✅ Remove items from cart
✅ View full cart page
✅ Access checkout page

**Admin:**
✅ Manage products in admin dashboard
✅ Edit product prices in admin
✅ Changes in admin visible on storefront immediately

**All Pages (17):**
✅ Homepage, All Products, Product Details
✅ Collections, Cart, Checkout, Order Success
✅ Account Dashboard, Orders, Addresses
✅ About, Contact, Shipping, FAQ, Privacy, Terms
✅ **Zero 404 errors** - all navigation links work

### Next Steps

1. **Add More Products** (Admin Dashboard)
   - Navigate to http://localhost:9000/app
   - Go to Products → Create Product
   - Add variants and prices
   - Changes appear on storefront immediately

2. **Customize Further**
   - Run `/edit-store` to make design changes
   - Edit files directly in `storefront/`
   - Backend is solid - no need to touch `backend/`

3. **Deploy to Production**
   - Run `/deploy-store` when ready
   - Backend and storefront deploy separately

### Configuration Files

- Backend environment: `backend/.env`
- Storefront environment: `storefront/.env.local`
- Publishable API Key: `{key}` (already configured)

### Architecture Summary

**Backend (Medusa v2):**
- Region: {region name} ({currency})
- Sales Channel: {channel name}
- Stock Location: {location}
- Products: {count} products with {variant count} total variants
- All variants linked to price sets ✅

**Storefront (Next.js 15):**
- Connected to backend via Medusa JS SDK
- Uses publishable API key for authentication
- Server components for product pages
- Client components for cart operations

### Documentation

- Architecture: `.claude/knowledge/medusa-v2-architecture.md`
- Full guide: `CLAUDE.md`
- Validation report: `VALIDATION_REPORT.md`

### 🎉 Store is Ready!

Users can start adding products in admin and they'll appear on storefront immediately.
No iteration needed - everything works in one go!
```

**If validation failed:**

```markdown
## ❌ Implementation Incomplete - Validation Failed

**Failed Tests:** {count}/{total}

### Issues Detected

{List of failed tests with error messages}

### Root Cause

{Diagnosis from validator agent}

### Required Fixes

{Specific fix instructions}

### DO NOT USE STORE until fixes are applied and validation passes.

Re-run validation after fixes:
1. Fix the underlying issues
2. Restart services
3. Run validation again
4. All tests must pass before store is usable
```

## Agents to Spawn

The implementation spawns these specialized agents in parallel:

### medusa-configurator
- Configures Medusa backend
- Sets up regions, payments, fulfillment
- Creates product types and workflows

### storefront-generator
- Generates Next.js storefront
- Copies and customizes template
- Configures Medusa connection

### theme-customizer
- Applies design tokens
- Customizes colors and typography
- Updates Tailwind configuration

## Error Handling

If any agent fails:
1. Read the error message
2. Fix the issue in PLAN.md or configuration
3. Re-run the failed agent
4. Continue with remaining steps

Common issues:
- Missing environment variables → Check .env files
- Database connection errors → Ensure PostgreSQL is running
- Port conflicts → Stop other services on ports 9000/3000
- Type errors → Run type-check and fix issues

## Parallel Execution

For efficiency, spawn agents in parallel when possible:

```
medusa-configurator + storefront-generator + theme-customizer
(all can run simultaneously since they work on different files)
```

Wait for all to complete before running quality checks.

## Important Notes

1. **Don't Skip Steps**: Follow the sequence for reliable results
2. **Verify Each Phase**: Test after each major step
3. **Keep User Informed**: Report progress throughout
4. **Handle Errors Gracefully**: Don't fail silently, report issues
5. **Document Changes**: Note any deviations from PLAN.md

## After Implementation

User can:
- Access admin dashboard to add products
- Customize further with `/edit-store`
- Deploy to production with `/deploy-store`
- Edit files directly in the generated store

## Next Commands

- `/edit-store` - Make iterative changes
- `/deploy-store` - Deploy to production
