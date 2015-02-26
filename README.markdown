# Lintify

> Browserify transform to abort bundling silly source files.

## Installation

    $ npm install lintify
    
## Lintify, [What is it Good For](http://en.wikipedia.org/wiki/The_Marine_Biologist#Plot)?

### Before

 1. *someone* creates CI job
 2. *someone* configures Checkstyle plugin for CI job
 3. *someone* configures JSHint to create Checkstyle format report
 4. *developer* saves silly source file
 5. *developer* commits silly source file to VCS
 6. *developer* pushes VCS commit to remote
 7. remote pushes notification to CI server
 8. CI server pulls in VCS changes
 9. CI server builds browserify bundle
10. CI server passes bundle to JSHint
11. JSHint generates Checkstyle report
12. CI server aborts build
13. CI server sends email to developer
14. *developer* fixes issues
15. *developer* commits potentially still silly source file to VCS
16. back to step 6

### After

1. *developer* saves silly source file
2. building browserify bundle is aborted
3. *developer* fixes issues

### Wait! Couldn't *developer* run JSHint herself?

That's what I used to think! 
It turns out, however, that the answer to that question is **no**.

## Options

    {
        errors: {
            head: function (file) {
                // log source file name
            },
            each: function (position, reason) {
                // log every error position in source file and reason
            },
            tail: function () {
                // log aborted bundle name
            },
            message: 'OH NOES LINT ERRORS EMITTED!!1!'
        },
        lintrc: {
            // JSHint options
        }
    }

## License

MIT
