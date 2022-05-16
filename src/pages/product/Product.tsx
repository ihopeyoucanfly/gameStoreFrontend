import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";


import { IProduct } from "../../utils/interfaces";

import { useProducts } from "../../hooks/useProducts";
import toggleProductLS from "../../hok/toggleProductLS";

import PageTitle from "../../components/ui/pageTitle/PageTitle";

import styles from "./product.module.scss";
import ScrollToTop from "../../components/ui/scroll/ScrollToTop";


// можно ещё фильтровать импорты, чтобы удобно было, типо компоненты в одной куче, CSS в другой и тд

const Product: FC = () => {
	const { product, getProduct, isLoading } = useProducts(); // получаем данные из хука(контекста)

	const { id } = useParams<string>();
	const [largeImg, setLargeImg] = useState<number>(0);

	const [favorites, setFavorites] = useState<boolean>(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// при старте страницы отправляем запрос
		if (id !== undefined) {
			getProduct({ id });
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (localStorage.getItem(product._id)) {
			setFavorites(true);
		}
	}, [localStorage.getItem(product._id)]);

	function addToFavorites(obj: IProduct): void {
		toggleProductLS(obj, setFavorites);
	}

	const onClickImgHandle = (index: number): void => {
		setLargeImg(index);
	};

	return (
		<>
			{isLoading || loading ? ( // тут какой то баг, и пришлось добавить два loading, один из контекста, один тут, в остальных компнонентах все работает норм, хз почему тут так
				<p>loading</p>
			) : (
				<div className={styles.product}>
					<div className={styles.header}>
						<PageTitle title={product.title} />
					</div>
					<div className={styles.content}>
						<div className={styles.productImgSwipper}>
							<Swiper
								slidesPerView={1}
								spaceBetween={70}
								navigation={true}
								className="mySwiper"
								style={{ maxWidth: 355 }}
								modules={[Navigation]}
							>
								{product.urlImages.map(img => (<SwiperSlide><img src={img} alt="image" /></SwiperSlide>))}
							</Swiper>
						</div>
						<div className={styles.productImg}>
							<div className={styles.large}>
								<img src={product.urlImages[largeImg]} alt="productImage" />
							</div>
							<div className={styles.small}>
								{product.urlImages.slice(1).map((img, index) => (
									<div
										className={index === largeImg ? styles.active : ""}
										onClick={() => onClickImgHandle(index)}
										key={img}
									>
										<img src={product.urlImages[index]} alt="small" />
									</div>
								))}
							</div>
						</div>
						<div className={styles.body}>
							<div className={styles.subtitle}>{product.desc}</div>
							<div className={styles.price}>
								<span>{product.price} ₽ </span>
								<span
									onClick={() => addToFavorites(product)}
									className={styles.heartIcon}
								>
									{" "}
									{favorites ? (
										<FavoriteOutlinedIcon color="success" />
									) : (
										<FavoriteBorderOutlinedIcon color="success" />
									)}
								</span>
							</div>
						</div>
					</div>
					<div className={styles.desc}>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.body}>{product.characteristic}</div>
					</div>
					<ScrollToTop />
				</div>
			)}
		</>
	);
};

export default Product;