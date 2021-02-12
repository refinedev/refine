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
};

export const ReadyPage: React.FC = () => {
    return (
        <div style={styles.root}>
            <div style={styles.main}>
                <h1>react-admin</h1>
                <h3>Welcome to react-admin</h3>
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
