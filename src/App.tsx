import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Textarea } from "./components/ui/textarea"
import { Star, Film, UserPlus, MessageSquarePlus, Plus, ExternalLink } from 'lucide-react'
import './styles/globals.css'

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  cast: string;
  rating: number;
  userRating: number;
  review: string;
  isLoading?: boolean;
}
const MovieRecommendationBot = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userTaste, setUserTaste] = useState('로맨틱 코미디');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ age: '', gender: '', location: '' });
  const [watchedMovies, setWatchedMovies] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchInitialMovies();
  }, []);

 

  const fetchInitialMovies = async () => {
    setIsLoading(true);
    const initialMovies = [
      { id: 1, title: "인셉션", year: 2010, genre: "SF, 액션", director: "크리스토퍼 놀란", cast: "레오나르도 디카프리오, 엘렌 페이지", rating: 8.8, userRating: 0, review: "현실과 꿈의 경계를 넘나드는 독특한 설정과 화려한 비주얼로 관객들의 눈을 사로잡는 작품. 놀란 감독 특유의 복잡한 구조와 심도 있는 스토리텔링이 돋보인다." },
      { id: 2, title: "노트북", year: 2004, genre: "로맨스, 드라마", director: "닉 카사베츠", cast: "라이언 고슬링, 레이첼 맥아담스", rating: 7.8, userRating: 0, review: "시간을 초월한 사랑 이야기를 감동적으로 그려낸 로맨스 영화의 명작. 두 주연 배우의 케미스트리와 아름다운 영상미가 인상적이다." },
      { id: 3, title: "다크나이트", year: 2008, genre: "액션, 범죄, 드라마", director: "크리스토퍼 놀란", cast: "크리스찬 베일, 히스 레저", rating: 9.0, userRating: 0, review: "히스 레저의 조커 연기가 압도적인 작품. 단순한 슈퍼히어로 영화를 넘어 인간의 선과 악, 정의에 대한 깊이 있는 성찰을 제공한다." },
      { id: 4, title: "포레스트 검프", year: 1994, genre: "드라마, 로맨스", director: "로버트 저메키스", cast: "톰 행크스, 로빈 라이트", rating: 8.8, userRating: 0, review: "단순하지만 순수한 영혼을 가진 주인공이 미국 현대사를 관통하며 겪는 놀라운 이야기. 삶의 의미와 사랑에 대한 깊은 통찰을 제공한다." },
    ];
    setTimeout(() => {
      setMovies(initialMovies);
      setIsLoading(false);
    }, 1000);
  };

  const fetchAdditionalMovies = async () => {
    setIsLoading(true);
    const newMovies: Movie[] = [
      { id: movies.length + 1, title: "매트릭스", year: 1999, genre: "SF, 액션", director: "워쇼스키 자매", cast: "키아누 리브스, 로렌스 피시번", rating: 8.7, userRating: 0, review: "현실과 가상의 경계를 탐험하는 혁신적인 SF 영화. 철학적 질문과 혁명적인 시각 효과를 결합하여 영화 역사에 큰 획을 그었다." },
      { id: movies.length + 2, title: "라라랜드", year: 2016, genre: "뮤지컬, 로맨스", director: "데미언 셔젤", cast: "라이언 고슬링, 엠마 스톤", rating: 8.0, userRating: 0, review: "꿈과 현실 사이에서 고민하는 두 예술가의 사랑 이야기. 아름다운 음악과 화려한 춤, 그리고 LA의 풍경이 어우러져 환상적인 분위기를 자아낸다." },
    ];
    setMovies(prevMovies => [...prevMovies, ...newMovies]);
      
    setTimeout(() => {
      setMovies(prevMovies => prevMovies.map(movie => ({...movie, isLoading: false})));
    }, 1000);
  };

  const handleNewRecommendation = () => {
    fetchAdditionalMovies();
  };

  const handleRating = (movieId: number, rating: number) => {
    setMovies(movies.map(movie => 
      movie.id === movieId ? { ...movie, userRating: rating } : movie
    ));
  };

  interface UserInfo {
    age: string;
    gender: string;
    location: string;
  }
  const handleUserInfoUpdate = (info: Partial<UserInfo>) => {
    setUserInfo(prevInfo => ({ ...prevInfo, ...info }));
  };

  const handleWatchedMovieAdd = (movie: string) => {
    setWatchedMovies(prevMovies => [...prevMovies, movie]);
  };

  const handleFeedbackSubmit = (newFeedback: string) => {
    setFeedback(newFeedback);
    console.log("피드백이 추천 시스템에 전달되었습니다:", newFeedback);
  };

  interface StarRatingProps {
    rating: number;
    onRate: (rating: number) => void;
  }
  const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`cursor-pointer transition-all duration-200 hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <CardHeader className="text-center bg-slate-700 text-white p-6 mb-6">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
            <AvatarImage src="/api/placeholder/200/200" alt="Movie Bot" />
            <AvatarFallback>LLecommend</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mb-2">영화 추천 시스템</h1>
          <p className="text-xl mb-4">당신의 취향: <span className="font-semibold bg-white text-slate-700 px-2 py-1 rounded-full">{userTaste}</span></p>
          <div className="flex justify-center space-x-4 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100 transition-all duration-200">
                  <UserPlus className="mr-2 h-4 w-4" /> 프로필 업데이트
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-700">나의 영화 프로필</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="age" className="text-right text-slate-600">
                      나이
                    </Label>
                    <Input id="age" value={userInfo.age} onChange={(e) => handleUserInfoUpdate({...userInfo, age: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right text-slate-600">
                      성별
                    </Label>
                    <Select onValueChange={(value) => handleUserInfoUpdate({...userInfo, gender: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right text-slate-600">
                      지역
                    </Label>
                    <Input id="location" value={userInfo.location} onChange={(e) => handleUserInfoUpdate({...userInfo, location: e.target.value})} className="col-span-3" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100 transition-all duration-200">
                  <MessageSquarePlus className="mr-2 h-4 w-4" /> 영화 취향 공유
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-700">나의 영화 취향</DialogTitle>
                </DialogHeader>
                <Textarea
                  placeholder="좋아하는 장르나 감독, 배우 등 영화 취향을 자유롭게 적어주세요!"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={() => handleFeedbackSubmit(feedback)} className="mt-4 bg-slate-700 text-white">
                  취향 공유하기
                </Button>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100 transition-all duration-200">
                  <Film className="mr-2 h-4 w-4" /> 본 영화 기록
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-700">내가 본 영화들</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="영화 제목을 입력하고 Enter를 눌러주세요"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      handleWatchedMovieAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="mb-4"
                />
                <div className="mt-4 max-h-[200px] overflow-y-auto">
                  <h3 className="font-bold mb-2 text-slate-700">시청 기록:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {watchedMovies.map((movie, index) => (
                      <li key={index} className="text-slate-600">{movie}</li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold text-slate-700">추천 영화 목록</h3>
          <p className="text-sm text-slate-600">당신의 취향은 특별합니다! 공유할수록 더 멋진 영화들을 만나게 될 거예요. 함께 탐험해볼까요?</p>
        </div>
        <div className="text-center mb-4">
            <Button onClick={handleNewRecommendation} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="mr-2 h-5 w-5" /> 새로운 영화 발견하기
            </Button>
        </div>
        <CardContent className="p-6">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {movies.slice().reverse().map((movie) => (
            <Card key={movie.id} className={`bg-white shadow hover:shadow-md transition-all duration-300 overflow-hidden rounded-lg ${movie.isLoading ? 'animate-pulse' : ''}`}>
              {movie.isLoading ? (
                <div className="p-4 flex items-center justify-center h-full">
                  <p className="text-center w-full col-span-2 text-2xl text-slate-600 animate-pulse">🎬 영화를 찾고 있어요...</p>
                </div>
              ) : (
                  <Card key={movie.id} className="bg-white shadow hover:shadow-md transition-all duration-300 overflow-hidden rounded-lg">
                    <CardHeader className="text-xl font-bold border-b pb-2 bg-slate-100 text-slate-700">{movie.title} ({movie.year})</CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">{movie.genre}</span>
                        <span className="text-sm font-bold text-slate-600">평점: {movie.rating}/10</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-semibold text-slate-600">감독:</span> {movie.director}</p>
                        <p className="text-sm"><span className="font-semibold text-slate-600">출연:</span> {movie.cast}</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 text-slate-700">리뷰</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{movie.review}</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 text-slate-700">평가하기</h4>
                        <StarRating rating={movie.userRating} onRate={(rating) => handleRating(movie.id, rating)} />
                      </div>
                      <Button className="bg-blue-600 text-white w-full flex items-center justify-center mb-4" onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(movie.title + ' ' + movie.year + ' 영화')}`, '_blank')}>
                        <ExternalLink className="mr-2 h-4 w-4" /> 영화 정보 검색
                      </Button>
                    </CardContent>
                  </Card>
              )}
            </Card>
          ))}
          </div>
        </CardContent>
    </Card> 
  </div>
  );
};

export default MovieRecommendationBot;
