import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface ICommunityNumberContext {
    githubStarCount: number;
    githubCommitCount: number;
    discordMemberCount: number;
    loading: boolean;
    refetch: () => Promise<void>;
}

export const CommunityNumberContext = createContext<
    ICommunityNumberContext | undefined
>(undefined);

export const CommunityNumberProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [githubStarCount, setGithubStarCount] = useState(0);
    const [githubCommitCount, setGithubCommitCount] = useState(0);
    const [discordMemberCount, setDiscordMemberCount] = useState(0);

    const fetchGithubCount = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `https://stargate.refine.dev/community-numbers`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            const json = await response.json();
            setGithubStarCount(json.githubStarCount);
            setGithubCommitCount(json.githubCommitCount);
            setDiscordMemberCount(json.discordMemberCount);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGithubCount();
    }, [fetchGithubCount]);

    const value = {
        githubStarCount,
        githubCommitCount,
        discordMemberCount,
        loading,
        refetch: fetchGithubCount,
    };

    return (
        <CommunityNumberContext.Provider value={value}>
            {children}
        </CommunityNumberContext.Provider>
    );
};

export const useCommunityNumberContext = () => {
    const context = useContext(CommunityNumberContext);
    if (context === undefined) {
        throw new Error(
            "useGithubProvider must be used within a GithubProvider",
        );
    }
    return context;
};
