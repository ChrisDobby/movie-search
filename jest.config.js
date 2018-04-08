module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/src/__tests__/fileTransformer.js',
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    modulePaths: [
        '<rootDir>/node_modules',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'es6',
    ],
    unmockedModulePathPatterns: [
        'react',
        'jquery',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/__tests__/setup.js',
        '<rootDir>/src/__tests__/fileTransformer.js',
    ],
    setupFiles: [
        '<rootDir>/src/__tests__/setup.js',
    ],
    collectCoverage: true,
    automock: false,
    testResultsProcessor: 'jest-junit',
};
