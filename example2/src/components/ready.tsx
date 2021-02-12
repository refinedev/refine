import * as React from 'react';

const styles = {
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as 'column',
        fontFamily: '"Roboto", sans-serif',
    },
    main: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as 'center',
        flexDirection: 'column' as 'column',
        background:
            'linear-gradient(135deg, #D5D5A4 0%, #C6C6AD 50%, #D0D0CD 100%)',
        color: '#565656',
        fontSize: '1.5em',
        fontWeight: 'bold' as 'bold',
    },
    logo: {
        height: 100,
    },
};

export const ReadyPage: React.FC = () => {
    return (
        <div style={styles.root}>
            <div style={styles.main}>
                <img
                    style={styles.logo}
                    src="data:image/png;base64,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"
                    alt="react-admin logo"
                />
                <h1>Welcome to react-admin</h1>
                <div>
                    Your application is properly configured.
                    <br />
                    Now you can add a &lt;Resource&gt; as child of
                    &lt;Admin&gt;.
                </div>
            </div>
        </div>
    );
}
