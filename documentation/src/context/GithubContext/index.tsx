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
    loading: boolean;
    refetch: () => Promise<void>;
}

export const GithubContext = createContext<IGithubContext | undefined>(
    undefined,
);

export const GithubProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [starCount, setStarCount] = useState(0);

    const fetchStarCount = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`https://stargate.refine.dev/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();
            setStarCount(json.stargazers_count);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStarCount();
    }, [fetchStarCount]);

    const value = {
        starCount,
        loading,
        refetch: fetchStarCount,
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
