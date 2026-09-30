# WAT.md: Python -> JS surprises

1. **`.sort()` mutates and defaults to string order.** `[10, 9, 1].sort()` gives `[1, 10, 9]`. It changes the array in place and returns the same array, so `ratesArray.sort(...)` and `sortedRates` are the same object. Python: `sorted()` copies, `list.sort()` mutates and returns `None`. Always pass a comparator for anything that isn't plain strings.
2. **Comparators return a number, not a bool.** `(a, b) => a - b` for numbers and `a.localeCompare(b)` for strings. Returning `a > b` (a bool) silently misbehaves.
3. **`fetch` doesn't throw on 404 or 500.** It only rejects on network failure. Check `response.ok` yourself.
4. **Top-level names can shadow built-ins.** `const URL = ...` shadows the global `URL` class. No error, it's just legal. Python would let you shadow `id` or `list` too.
5. **An object isn't iterable like a dict.** Python `for k, v in d.items()` becomes `Object.entries(obj)` in JS, which returns an array of `[key, value]` pairs.
