This script makes all your lodash imports modular.

For example:

```
import { sortBy } from 'lodash'
import { throttle, debounce } from 'lodash'
```

Would be:

```
import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
```

Setup & Run

```
npm install -g jscodeshift
git clone https://github.com/dgrijuela/modular-lodash-codemod.git
jscodeshift -t modular-lodash-codemod/modular-lodash.js <your-project-dir>
```

Check both JS and JSX files using the `--extensions` flag:

```
jscodeshift --extensions=js,jsx -t modular-lodash-codemod/modular-lodash.js <your-project-dir>
```
