import { useRouter } from 'next/navigation';
export const useLink = () => {
    const router = useRouter();
    const goToPath = (path) => router.push('/dashboard/' + path.replace(/\/$/, ''));
    const back = router.back;
    // return value and toggle function
    return {
        goToPath,
        back
    };
};
