export default class RequestCanceler {
    constructor(chainedCanceler?: RequestCanceler) {
        this.chainedCanceler = chainedCanceler;

        // const sub = authSubject
        //     .pipe(
        //         skip(1),
        //         filter(isAuth => !isAuth),
        //     )
        //     .subscribe(() => {
        //         this.cancel('Session expired');
        //         sub.unsubscribe();
        //     });
    }

    private chainedCanceler?: RequestCanceler;

    private abortController = new AbortController();

    public get signal() {
        return this.abortController.signal;
    }

    public cancel = () => {
        this.abortController.abort();
        this.regenerateToken();
        if (this.chainedCanceler) {
            this.chainedCanceler.cancel();
        }
    };

    private regenerateToken = () => {
        this.abortController = new AbortController();
        if (this.chainedCanceler) {
            this.chainedCanceler.regenerateToken();
        }
    };
}
