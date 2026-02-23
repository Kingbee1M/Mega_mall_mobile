import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export type Review = {
  rating: number;
  comment: string;
  profilePic?: ImageSourcePropType
};


export type Product = {
  id: string;
  media: ImageSourcePropType[];
  title: string;
  price: number;
  reviews: Record<string, Review>; 
  discount?: number;
  stock: number;
  likes: number;
};

type ContentStore = {
  items: Product[];
  addItem: (item: Product) => void;
  updateLikes: (id: string, likes: number) => void;
  updateStock: (id: string, stock: number) => void;
  addReview: (id: string, username: string, review: Review) => void;
  getAverageRating: (id: string) => number;
};

export const useContentStore = create<ContentStore>((set, get) => ({
  items: [
    {
      id: "1",
      media: [
        require("../assets/images/Headphones.png"),
        require("../assets/images/realistic-headphones.jpg"),
        require("../assets/images/black-headphones-digital-device.jpg"),
        require("../assets/images/still-life-wireless-cyberpunk-headphones.jpg"),
        require("../assets/images/levitating-music-headphones-display.jpg"),
      ],
      title: "High Quality HeadPhones",
      price: 15000,
      reviews: {
        "John Doe": { rating: 5, comment: "Lorem est tilon giberish, vantu seleris promentum vora. Kresta nulo dular mengo, vili tivara quantis. Est gloren subtis, nira lo vantu. Tilon dromas, seleris munda vora kranis. Poro glis vantu nulo, tivara menda kresta dular. Seleris vora munda quantis nira gloren, promentum vili lo mendo. Kresta vantu dromas est tilon nulo.!", profilePic: require("../assets/images/levitating-music-headphones-display.jpg") },
        "Jane": { rating: 4, comment: "Lorem est tilon giberish, vantu seleris promentum vora. Kresta nulo dular mengo, vili tivara quantis. Est gloren subtis, nira lo vantu.", profilePic: require("../assets/images/woman_in_forest.jpg") },
      },
      discount: 10,
      stock: 8,
      likes: 22,
    },
    {
      id: "2",
      media: [
        require("../assets/images/wireless-ear-piece.png"),
        require("../assets/images/black-woman-listening-music.jpg"),
        require("../assets/images/highquality-black-wired-earphones.jpg"),
        require("../assets/images/white-earphone-white-paper-blue-background.jpg"),
      ],
      title: "High volume Earphones",
      price: 7000,
      reviews: {
        "John Doe": { rating: 5, comment: "Lorem est tilon giberish, vantu seleris promentum vora. Kresta nulo dular mengo, vili tivara quantis. Est gloren subtis, nira lo vantu. Tilon dromas, seleris munda vora kranis. Poro glis vantu nulo, tivara menda kresta dular. Seleris vora munda quantis nira gloren, promentum vili lo mendo. Kresta vantu dromas est tilon nulo. Gloren menda seleris vora, tivara quantis promentum vili. Dromas nulo dular kranis poro glis, vantu vora munda seleris kresta lo nira subtis mendo.!", profilePic: require("../assets/images/polite-looking-guy.jpg") },
        "jill": { rating: 2, comment: "Lorem est tilon giberish, vantu seleris promentum vora. Kresta nulo dular mengo, vili tivara quantis. Est gloren subtis, nira lo vantu.", profilePic: require("../assets/images/red-shirt-woman.jpg")},
      },
      discount: 20,
      stock: 50,
      likes: 72,
    },
    {
      id: "3",
      media: [
        require("../assets/images/hand-drill.png"),
        require("../assets/images/woman-with-electric-drill-yellow-background.jpg"),
        require("../assets/images/man-using-electronic-drill.jpg"),
        require("../assets/images/side-view-worker-using-drill.jpg"),
      ],
      title: "Electric Hand Drill",
      price: 25000,
      reviews: {
        "Jhonny cage": { rating: 5, comment: "The sound quality is really nice!", profilePic: require("../assets/images/casual-young-african-man-smiling-isolated-white.jpg")},
        "Jannet": { rating: 5, comment: "it could have been better but it alright", profilePic: require("../assets/images/african-teenage-girl-portrait-happy-smiling-face.jpg")},
      },
      discount: 20,
      stock: 50,
      likes: 72,
    },
  ]as Product[],

  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),

  updateLikes: (id, likes) =>
    set((state) => ({
      items: state.items.map((p) =>
        p.id === id ? { ...p, likes } : p
      ),
    })),

  updateStock: (id, stock) =>
    set((state) => ({
      items: state.items.map((p) =>
        p.id === id ? { ...p, stock } : p
      ),
    })),

  addReview: (id, username, review) =>
    set((state) => ({
      items: state.items.map((p) =>
        p.id === id
          ? {
              ...p,
              reviews: {
                ...p.reviews,
                [username]: review,
              },
            }
          : p
      ),
    })),

  getAverageRating: (id) => {
    const product = get().items.find((p) => p.id === id);
    if (!product || !product.reviews) return 0;

    const ratings = Object.values(product.reviews).map((r) => r.rating);
    const total = ratings.reduce((acc, n) => acc + n, 0);
    return ratings.length > 0 ? total / ratings.length : 0;
  },
}));
