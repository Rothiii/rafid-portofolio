# Connection Limiting System

This portfolio includes a robust connection limiting system to protect against DDoS attacks and traffic overload, especially important for Vercel's free tier.

## 🛡️ **System Overview**

The system limits concurrent connections to **50 maximum** to prevent server overload and unexpected costs.

## 📁 **Files Structure**

```
middleware.ts                              # Main connection interceptor
src/
├── lib/
│   └── connection-limiter.ts             # Core connection tracking logic
├── components/
│   ├── ConnectionTracker.tsx             # Client-side connection cleanup
│   └── ConnectionStatus.tsx              # Debug panel (dev only)
├── app/
│   ├── api/
│   │   ├── connection-status/route.ts    # Connection monitoring API
│   │   ├── debug-connections/route.ts    # Testing/debugging API
│   │   └── release-connection/route.ts   # Connection cleanup API
│   └── server-capacity/page.tsx          # Error page when limit reached
__tests__/
└── connection-limiter.test.ts            # Unit tests
test-connection-limit.js                  # Browser test script
jest.config.js                           # Test configuration
```

## 🚀 **How It Works**

### **1. Request Interception (middleware.ts)**

- Intercepts all page requests (except API routes and static files)
- Tracks IP addresses and connection counts
- Redirects to error page when limit reached

### **2. Connection Tracking (connection-limiter.ts)**

- Maps IP addresses to connection counts with timestamps
- Automatically cleans up stale connections (5-minute timeout)
- Provides debug information and statistics

### **3. Client-Side Cleanup (ConnectionTracker.tsx)**

- Automatically releases connections when users leave the site
- Handles tab closing, browser closing, and page navigation
- Uses `beforeunload` and `visibilitychange` events

### **4. Debug Tools (ConnectionStatus.tsx)**

- Shows real-time connection statistics (development only)
- Provides test buttons to simulate traffic
- Updates every 5 seconds with current status

## 🧪 **Testing**

### **Unit Tests**

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### **Browser Testing**

1. Go to your live site: https://rafid-portofolio.vercel.app/
2. Open browser console (F12)
3. Copy and paste content from `test-connection-limit.js`
4. Watch automated testing of the 50-connection limit

### **Manual Testing Functions**

```javascript
testConnectionLimit(); // Full automated test
addTestConnections(55); // Add 55 fake connections
cleanupConnections(); // Clean up test data
getConnectionStatus(); // Check current status
```

## 📊 **Expected Behavior**

### **Normal Operation**

- ✅ Connections 1-50: Allow access
- ❌ Connection 51+: Redirect to `/server-capacity` page
- 🧹 Automatic cleanup when users leave

### **Development Mode**

- Debug panel appears (bottom-right corner)
- Detailed console logging
- Real-time connection monitoring

### **Production Mode**

- Clean logs (only critical security warnings)
- No debug panel visible
- Optimal performance

## 🛠️ **Configuration**

### **Change Connection Limit**

Edit `MAX_CONCURRENT_CONNECTIONS` in `src/lib/connection-limiter.ts`:

```typescript
const MAX_CONCURRENT_CONNECTIONS = 50; // Change this number
```

### **Adjust Timeout**

Edit `CONNECTION_TIMEOUT` in `src/lib/connection-limiter.ts`:

```typescript
const CONNECTION_TIMEOUT = 300000; // 5 minutes in milliseconds
```

### **Disable Debug Panel**

The debug panel only shows in development mode and is automatically hidden in production.

## 🔧 **API Endpoints**

### **`/api/connection-status`**

Returns current connection statistics:

```json
{
  "userConnections": 2,
  "totalConnections": 25,
  "maxAllowed": 50,
  "availableSlots": 25
}
```

### **`/api/debug-connections`**

Testing and debugging endpoint:

- `GET ?action=add&count=10` - Add fake connections
- `GET ?action=cleanup` - Clean up all connections
- `POST {action: "release", ip: "1.2.3.4"}` - Release specific IP

### **`/api/release-connection`**

Manual connection cleanup:

- `POST {ip: "1.2.3.4"}` - Release connection for specific IP

## 🚨 **Security Features**

- **IP Masking**: Production logs show partial IPs (`192.168.1***`)
- **Rate Limiting**: Prevents connection spam
- **Automatic Cleanup**: Removes stale connections
- **Development-Only Debugging**: No sensitive info in production logs

## 📈 **Benefits**

1. **Cost Protection**: Prevents Vercel bill explosions
2. **DDoS Mitigation**: Blocks excessive concurrent connections
3. **User Experience**: Graceful degradation with clear error messages
4. **Monitoring**: Real-time connection tracking and alerts
5. **Testing**: Comprehensive test suite for reliability

## 🔍 **Troubleshooting**

### **Connection Limit Not Working**

1. Check middleware is running: Look for `[MIDDLEWARE]` logs in development
2. Verify IP detection: Check debug panel shows correct IP
3. Test with browser script: Run `testConnectionLimit()` in console

### **Debug Panel Not Showing**

- Only visible in development mode (`npm run dev`)
- Check component is imported in `layout.tsx`
- Verify `process.env.NODE_ENV === 'development'`

### **Tests Failing**

1. Install test dependencies: `npm install --save-dev jest @types/jest ts-jest`
2. Check Jest configuration in `jest.config.js`
3. Run tests with: `npm test`

## 📝 **Notes**

- System designed specifically for Vercel free tier limitations
- Automatically scales with your traffic patterns
- Zero configuration required for basic usage
- Extensible for custom requirements
