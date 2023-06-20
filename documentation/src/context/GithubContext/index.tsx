import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface IGithubContext {
    starCount: number;
    commitCount: number;
    loading: boolean;
    refetch: () => Promise<void>;
}

export const GithubContext = createContext<IGithubContext | undefined>(
    undefined,
);

export const GithubProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [starCount, setStarCount] = useState(0);
    const [commitCount, setCommitCount] = useState(0);

    const fetchGithubCount = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`https://stargate.refine.dev/github`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();
            setStarCount(json.starCount);
            setCommitCount(json.commitCount);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGithubCount();
    }, [fetchGithubCount]);

    const value = {
        starCount,
        commitCount,
        loading,
        refetch: fetchGithubCount,
    };

    return (
        <GithubContext.Provider value={value}>
            {children}
        </GithubContext.Provider>
    );
};

export const useGithubContext = () => {
    const context = useContext(GithubContext);
    if (context === undefined) {
        throw new Error(
            "useGithubProvider must be used within a GithubProvider",
        );
    }
    return context;
};
