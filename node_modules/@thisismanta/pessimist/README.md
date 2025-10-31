```ts
import { parseArguments } from '@thisismanta/pessimist'

const args = parseArguments(
    process.argv.slice(2), 
    {
        dryRun: false,
        count: 0,
        outputFileName: '',
        exclude: [],
    }
)
```

```sh
node myfile file1 file2--output-file-name=file3 
```

The above command yields `args` of the following type.

```ts
{
    // From the field-value arguments
    outputFileName: 'file3',

    // From the defaults
    dryRun: false,
    count: 0,
    exclude: [],

    // From the positional arguments
    '0': 'file1', 
    '1': 'file2',
    length: 2,
}
```

### Unknown field rejection

The below commands exit with non-zero code as `somethingElse` is **not defined** in the default object (the second parameter of `parseArguments` function).

```sh
node myfile --something-else
```

Therefore it is important to have all the possible field-value arguments defined in the default object.

### Auto camel case conversion

The below commands yield the same output as `dry-run` is transformed into a camel case.

```sh
node myfile --dryRun
node myfile --dry-run
```

### Field aliases

The below commands yield the same output as `-d` is an alias of `--dryRun` which is defined in the extra options.

```ts
parseArguments(
    process.argv.slice(2), 
    {
        dryRun: false,
    },
    {
        aliases: [['d', 'dryRun'], ...],
    }
)
```

```sh
node myfile --dryRun
node myfile -d
```

### False-like Boolean recognition

The below commands yield the same output.

```sh
node myfile --dryRun=false
node myfile --dryRun=False
node myfile --dryRun=FALSE
node myfile --dryRun=n
node myfile --dryRun=no
node myfile --dryRun=0
```

### Negation and clearance

The below commands yield `dryRun === false` as `no` prefix negates the Boolean value.

```sh
node myfile --noDryRun
node myfile --no-dry-run
```

The below commands yield `outputFileName === ''` as `no` prefix sets the value to an empty string.

```sh
node myfile --noOutputFileName
node myfile --no-output-file-name
```

The below commands yield `input == []` as `no` prefix sets the value to an empty array.

```sh
node myfile --noExclude
node myfile --no-exclude
```

### Duplicate-free guarantee

The below commands yield `input: ['file2', 'file1']` as it does not keep duplicate values.

```sh
node myfile --exclude=file1 --exclude=file2 --exclude=file1
```

### Mutual exclusive fields

The below command throws an error as both fields are defined as mutually exclusive in the extra options.

```ts
parseArguments(
    process.argv.slice(2), 
    {
        dryRun: false,
        confirmed: true,
    },
    {
        exclusives: [['dryRun', 'confirmed'], ...],
    }
)
```

```sh
node myfile --dryRun --confirmed
```
