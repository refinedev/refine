import React from "react";
declare const ReactLiveScope: {
    createFactory<T extends HTMLElement>(
        type: keyof React.ReactHTML,
    ): React.HTMLFactory<T>;
    createFactory(type: keyof React.ReactSVG): React.SVGFactory;
    createFactory<P extends React.DOMAttributes<T_1>, T_1 extends Element>(
        type: string,
    ): React.DOMFactory<P, T_1>;
    createFactory<P_1>(
        type: React.FunctionComponent<P_1>,
    ): React.FunctionComponentFactory<P_1>;
    createFactory<P_2>(
        type: React.ClassType<
            P_2,
            React.ClassicComponent<P_2, any>,
            React.ClassicComponentClass<P_2>
        >,
    ): React.CFactory<P_2, React.ClassicComponent<P_2, any>>;
    createFactory<
        P_3,
        T_2 extends React.Component<P_3, any, any>,
        C extends React.ComponentClass<P_3, any>,
    >(
        type: React.ClassType<P_3, T_2, C>,
    ): React.CFactory<P_3, T_2>;
    createFactory<P_4>(
        type: React.ComponentClass<P_4, any>,
    ): React.Factory<P_4>;
    createElement(
        type: "input",
        props?:
            | (React.InputHTMLAttributes<HTMLInputElement> &
                  React.ClassAttributes<HTMLInputElement>)
            | null
            | undefined,
        ...children: React.ReactNode[]
    ): React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;
    createElement<
        P_5 extends React.HTMLAttributes<T_3>,
        T_3 extends HTMLElement,
    >(
        type: keyof React.ReactHTML,
        props?: (React.ClassAttributes<T_3> & P_5) | null | undefined,
        ...children: React.ReactNode[]
    ): React.DetailedReactHTMLElement<P_5, T_3>;
    createElement<P_6 extends React.SVGAttributes<T_4>, T_4 extends SVGElement>(
        type: keyof React.ReactSVG,
        props?: (React.ClassAttributes<T_4> & P_6) | null | undefined,
        ...children: React.ReactNode[]
    ): React.ReactSVGElement;
    createElement<P_7 extends React.DOMAttributes<T_5>, T_5 extends Element>(
        type: string,
        props?: (React.ClassAttributes<T_5> & P_7) | null | undefined,
        ...children: React.ReactNode[]
    ): React.DOMElement<P_7, T_5>;
    createElement<P_8 extends {}>(
        type: React.FunctionComponent<P_8>,
        props?: (React.Attributes & P_8) | null | undefined,
        ...children: React.ReactNode[]
    ): React.FunctionComponentElement<P_8>;
    createElement<P_9 extends {}>(
        type: React.ClassType<
            P_9,
            React.ClassicComponent<P_9, any>,
            React.ClassicComponentClass<P_9>
        >,
        props?:
            | (React.ClassAttributes<React.ClassicComponent<P_9, any>> & P_9)
            | null
            | undefined,
        ...children: React.ReactNode[]
    ): React.CElement<P_9, React.ClassicComponent<P_9, any>>;
    createElement<
        P_10 extends {},
        T_6 extends React.Component<P_10, any, any>,
        C_1 extends React.ComponentClass<P_10, any>,
    >(
        type: React.ClassType<P_10, T_6, C_1>,
        props?: (React.ClassAttributes<T_6> & P_10) | null | undefined,
        ...children: React.ReactNode[]
    ): React.CElement<P_10, T_6>;
    createElement<P_11 extends {}>(
        type:
            | string
            | React.FunctionComponent<P_11>
            | React.ComponentClass<P_11, any>,
        props?: (React.Attributes & P_11) | null | undefined,
        ...children: React.ReactNode[]
    ): React.ReactElement<P_11, string | React.JSXElementConstructor<any>>;
    cloneElement<
        P_12 extends React.HTMLAttributes<T_7>,
        T_7 extends HTMLElement,
    >(
        element: React.DetailedReactHTMLElement<P_12, T_7>,
        props?: P_12 | undefined,
        ...children: React.ReactNode[]
    ): React.DetailedReactHTMLElement<P_12, T_7>;
    cloneElement<
        P_13 extends React.HTMLAttributes<T_8>,
        T_8 extends HTMLElement,
    >(
        element: React.ReactHTMLElement<T_8>,
        props?: P_13 | undefined,
        ...children: React.ReactNode[]
    ): React.ReactHTMLElement<T_8>;
    cloneElement<P_14 extends React.SVGAttributes<T_9>, T_9 extends SVGElement>(
        element: React.ReactSVGElement,
        props?: P_14 | undefined,
        ...children: React.ReactNode[]
    ): React.ReactSVGElement;
    cloneElement<P_15 extends React.DOMAttributes<T_10>, T_10 extends Element>(
        element: React.DOMElement<P_15, T_10>,
        props?: (React.DOMAttributes<T_10> & P_15) | undefined,
        ...children: React.ReactNode[]
    ): React.DOMElement<P_15, T_10>;
    cloneElement<P_16>(
        element: React.FunctionComponentElement<P_16>,
        props?: (Partial<P_16> & React.Attributes) | undefined,
        ...children: React.ReactNode[]
    ): React.FunctionComponentElement<P_16>;
    cloneElement<P_17, T_11 extends React.Component<P_17, any, any>>(
        element: React.CElement<P_17, T_11>,
        props?: (Partial<P_17> & React.ClassAttributes<T_11>) | undefined,
        ...children: React.ReactNode[]
    ): React.CElement<P_17, T_11>;
    cloneElement<P_18>(
        element: React.ReactElement<
            P_18,
            string | React.JSXElementConstructor<any>
        >,
        props?: (Partial<P_18> & React.Attributes) | undefined,
        ...children: React.ReactNode[]
    ): React.ReactElement<P_18, string | React.JSXElementConstructor<any>>;
    createContext<T_12>(defaultValue: T_12): React.Context<T_12>;
    isValidElement<P_19>(
        object: {} | null | undefined,
    ): object is React.ReactElement<
        P_19,
        string | React.JSXElementConstructor<any>
    >;
    createRef<T_13>(): React.RefObject<T_13>;
    forwardRef<T_14, P_20 = {}>(
        render: React.ForwardRefRenderFunction<T_14, P_20>,
    ): React.ForwardRefExoticComponent<
        React.PropsWithoutRef<P_20> & React.RefAttributes<T_14>
    >;
    memo<P_21 extends object>(
        Component: React.FunctionComponent<P_21>,
        propsAreEqual?:
            | ((
                  prevProps: Readonly<P_21>,
                  nextProps: Readonly<P_21>,
              ) => boolean)
            | undefined,
    ): React.NamedExoticComponent<P_21>;
    memo<T_15 extends React.ComponentType<any>>(
        Component: T_15,
        propsAreEqual?:
            | ((
                  prevProps: Readonly<React.ComponentProps<T_15>>,
                  nextProps: Readonly<React.ComponentProps<T_15>>,
              ) => boolean)
            | undefined,
    ): React.MemoExoticComponent<T_15>;
    lazy<T_16 extends React.ComponentType<any>>(
        factory: () => Promise<{
            default: T_16;
        }>,
    ): React.LazyExoticComponent<T_16>;
    useContext<T_17>(context: React.Context<T_17>): T_17;
    useState<S>(
        initialState: S | (() => S),
    ): [S, React.Dispatch<React.SetStateAction<S>>];
    useState<S_1 = undefined>(): [
        S_1 | undefined,
        React.Dispatch<React.SetStateAction<S_1 | undefined>>,
    ];
    useReducer<R extends React.ReducerWithoutAction<any>, I>(
        reducer: R,
        initializerArg: I,
        initializer: (arg: I) => React.ReducerStateWithoutAction<R>,
    ): [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction];
    useReducer<R_1 extends React.ReducerWithoutAction<any>>(
        reducer: R_1,
        initializerArg: React.ReducerStateWithoutAction<R_1>,
        initializer?: undefined,
    ): [React.ReducerStateWithoutAction<R_1>, React.DispatchWithoutAction];
    useReducer<R_2 extends React.Reducer<any, any>, I_1>(
        reducer: R_2,
        initializerArg: I_1 & React.ReducerState<R_2>,
        initializer: (
            arg: I_1 & React.ReducerState<R_2>,
        ) => React.ReducerState<R_2>,
    ): [React.ReducerState<R_2>, React.Dispatch<React.ReducerAction<R_2>>];
    useReducer<R_3 extends React.Reducer<any, any>, I_2>(
        reducer: R_3,
        initializerArg: I_2,
        initializer: (arg: I_2) => React.ReducerState<R_3>,
    ): [React.ReducerState<R_3>, React.Dispatch<React.ReducerAction<R_3>>];
    useReducer<R_4 extends React.Reducer<any, any>>(
        reducer: R_4,
        initialState: React.ReducerState<R_4>,
        initializer?: undefined,
    ): [React.ReducerState<R_4>, React.Dispatch<React.ReducerAction<R_4>>];
    useRef<T_18>(initialValue: T_18): React.MutableRefObject<T_18>;
    useRef<T_19>(initialValue: T_19 | null): React.RefObject<T_19>;
    useRef<T_20 = undefined>(): React.MutableRefObject<T_20 | undefined>;
    useLayoutEffect(
        effect: React.EffectCallback,
        deps?: React.DependencyList | undefined,
    ): void;
    useEffect(
        effect: React.EffectCallback,
        deps?: React.DependencyList | undefined,
    ): void;
    useImperativeHandle<T_21, R_5 extends T_21>(
        ref: React.Ref<T_21> | undefined,
        init: () => R_5,
        deps?: React.DependencyList | undefined,
    ): void;
    useCallback<T_22 extends Function>(
        callback: T_22,
        deps: React.DependencyList,
    ): T_22;
    useMemo<T_23>(
        factory: () => T_23,
        deps: React.DependencyList | undefined,
    ): T_23;
    useDebugValue<T_24>(
        value: T_24,
        format?: ((value: T_24) => any) | undefined,
    ): void;
    useDeferredValue<T_25>(value: T_25): T_25;
    useTransition(): [boolean, React.TransitionStartFunction];
    startTransition(scope: React.TransitionFunction): void;
    useId(): string;
    useInsertionEffect(
        effect: React.EffectCallback,
        deps?: React.DependencyList | undefined,
    ): void;
    useSyncExternalStore<Snapshot>(
        subscribe: (onStoreChange: () => void) => () => void,
        getSnapshot: () => Snapshot,
        getServerSnapshot?: (() => Snapshot) | undefined,
    ): Snapshot;
    Children: {
        map<T_26, C_2>(
            children: C_2 | readonly C_2[],
            fn: (child: C_2, index: number) => T_26,
        ): C_2 extends null | undefined
            ? C_2
            : Exclude<T_26, boolean | null | undefined>[];
        forEach<C_3>(
            children: C_3 | readonly C_3[],
            fn: (child: C_3, index: number) => void,
        ): void;
        count(children: any): number;
        only<C_4>(children: C_4): C_4 extends any[] ? never : C_4;
        toArray(
            children: React.ReactNode | React.ReactNode[],
        ): (
            | string
            | number
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
        )[];
    };
    Fragment: React.ExoticComponent<{
        children?: React.ReactNode;
    }>;
    StrictMode: React.ExoticComponent<{
        children?: React.ReactNode;
    }>;
    Suspense: React.ExoticComponent<React.SuspenseProps>;
    version: string;
    Profiler: React.ExoticComponent<React.ProfilerProps>;
    Component: typeof React.Component;
    PureComponent: typeof React.PureComponent;
    React: typeof React;
};
export default ReactLiveScope;
