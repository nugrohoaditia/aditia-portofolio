import "@testing-library/jest-dom";

jest.mock(
    "@vercel/analytics/react",
    () => ({
        Analytics: () => null
    }),
    { virtual: true }
);

class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }

    observe(target) {
        this.callback([{ isIntersecting: true, target }]);
    }

    unobserve() {}

    disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;
