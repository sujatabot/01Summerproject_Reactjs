import { useGetAllTexts1 } from '../api/text1api/text1api';
import { useQueryClient } from 'react-query';

export const Orgname = () => {
    const queryClient = useQueryClient();
    const { data: texts, isLoading, isError } = useGetAllTexts1();
    queryClient.invalidateQueries("texts",texts)

    if (isLoading) {
        return <div>Loading texts...</div>;
    }

    if (isError) {
        return <div>Error loading texts...</div>;
    }

    return (
        <>
            {texts.length > 0 ? (
                texts.map((text) => (
                    <div key={text.id}>
                        <h1 className="text-3xl font-bold tracking-wide">{text.title}</h1>
                    </div>
                ))
            ) : (
                <div>No texts available.</div>
            )}
        </>
    );
};
