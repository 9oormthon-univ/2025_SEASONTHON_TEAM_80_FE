import { KakaoLoginButton } from "./components/ui/kakao-login-button";
import { NavigationButton } from "./components/ui/navigation-button";
import { NicknameInput } from "./components/ui/nickname-input";
import { LinkShareButton } from "./components/ui/link-share-button";

function App() {
    return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
            {/* 카카오 로그인 버튼 */}
            <div className="mt-8">
                <KakaoLoginButton 
                    onClick={() => console.log("카카오 로그인 클릭!")}
                />
            </div>
            
            {/* 네비게이션 버튼 예시 */}
            <div className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">네비게이션 버튼</h3>
                <NavigationButton active={true}>
                    활성화된 버튼
                </NavigationButton>
                <NavigationButton active={false}>
                    비활성화된 버튼
                </NavigationButton>
            </div>
            
            {/* 닉네임 입력창 예시 */}
            <div className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">닉네임 입력창</h3>
                <NicknameInput 
                    onChange={(value) => console.log("닉네임:", value)}
                    onValidationChange={(hasError) => console.log("에러 상태:", hasError)}
                />
            </div>
            
            {/* 링크 공유 버튼 예시 */}
            <div className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">링크 공유 버튼</h3>
                <LinkShareButton 
                    onClick={() => console.log("링크 공유 클릭!")}
                />
            </div>
        </div>
    );
}

export default App;
