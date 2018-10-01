export class SortEvent {
    currentIndex: number;
    newIndex: number;

    constructor(current, newIndex) {
        this.currentIndex = current;
        this.newIndex = newIndex;
    }
}
