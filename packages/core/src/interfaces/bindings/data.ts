/**
 * @author aliemir
 *
 * There's no change between `DataBindings` and `DataProvider` interfaces.
 *
 * But we should probably throw a soft error to the console if there's no `default` key in `MultipleDataBinding`.
 */

import { IDataContext } from "@contexts/data/IDataContext";

export type SingleDataBinding = IDataContext;

export type MultipleDataBinding = {
    default: IDataContext;
    [key: string]: IDataContext;
};

export type DataBindings = SingleDataBinding | MultipleDataBinding;
