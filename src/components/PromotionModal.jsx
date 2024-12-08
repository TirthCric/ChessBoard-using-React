

import whiteRook from "../assets/rook_w.png"
import blackRook from "../assets/rook_b.png"
import whiteKnight from "../assets/knight_w.png"
import blackKnight from "../assets/Knight_b.png"
import whiteBishop from "../assets/bishop_w.png"
import blackBishop from "../assets/bishop_b.png"
import whiteQueen from "../assets/queen_w.png"
import blackQueen from "../assets/queen_b.png"


const PromotionModal = ({ color, onPromote, position }) => (
    <div className="absolute flex flex-col items-center gap-2 bg-black p-4 rounded-lg"
        style={{
            top: position.top + 'px',
            left: position.left + 'px',
            transform: 'translate(-50%, -50%)',
        }}
    >
        <p className="text-white text-lg">Choose a piece for promotion:</p>
        <div className="flex gap-2">
            <button onClick={() => onPromote('queen')}>
                <img src={color === 'white' ? whiteQueen : blackQueen} alt="Queen" className="w-16 h-16" />
            </button>
            <button onClick={() => onPromote('rook')}>
                <img src={color === 'white' ? whiteRook : blackRook} alt="Rook" className="w-16 h-16" />
            </button>
            <button onClick={() => onPromote('bishop')}>
                <img src={color === 'white' ? whiteBishop : blackBishop} alt="Bishop" className="w-16 h-16" />
            </button>
            <button onClick={() => onPromote('knight')}>
                <img src={color === 'white' ? whiteKnight : blackKnight} alt="Knight" className="w-16 h-16" />
            </button>
        </div>
    </div>
);

export default PromotionModal