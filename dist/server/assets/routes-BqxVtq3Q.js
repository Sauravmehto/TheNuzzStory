import { A as p_catfood_default, C as DEHYDRATED_PRODUCTS, D as p_accessories_default, E as p_health_default, O as p_toys_default, S as BED_PRODUCTS, _ as money, b as resolveCatalogImage, g as groomingServices, j as p_dogfood_default, k as p_grooming_default, w as KRUNCH_PRODUCTS } from "./catalog-db-DaRD-zQ5.js";
import { d as useStore, l as BrandLockup, u as cn } from "./router-qWL6gFKw.js";
import { t as grooming_hero_default } from "./grooming-hero-CIEd6lu0.js";
import { createContext, memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Home as Home$1, LayoutGrid, MapPin, Play, Search, ShoppingCart, Tag, User, X } from "lucide-react";
//#region src/assets/hero-pets.jpg
var hero_pets_default = "/assets/hero-pets-D3SYTPNQ.jpg";
//#endregion
//#region src/components/home/media.ts
var pack = (index) => DEHYDRATED_PRODUCTS[index]?.both ?? "/assets/p-dogfood-DZPssGR1.jpg";
var crunch = (index) => KRUNCH_PRODUCTS[index]?.both ?? "/assets/p-catfood-DfnZwJhU.jpg";
var bed = (index) => BED_PRODUCTS[index]?.front ?? "/assets/p-accessories-CVyxet2n.jpg";
/** Stand-ins until files exist in src/assets/home/. */
var homeImages = {
	hero: [
		hero_pets_default,
		p_dogfood_default,
		p_catfood_default,
		grooming_hero_default
	],
	tiles: [
		p_dogfood_default,
		pack(0),
		crunch(0),
		pack(1),
		p_toys_default,
		p_accessories_default,
		pack(2),
		crunch(1)
	],
	spoil: [
		p_dogfood_default,
		pack(3),
		p_catfood_default,
		crunch(2)
	],
	promo: hero_pets_default,
	brand: pack(4),
	brandCards: [
		p_dogfood_default,
		crunch(0),
		p_catfood_default,
		p_health_default
	],
	treats: [
		pack(1),
		crunch(1),
		pack(5),
		crunch(3)
	],
	catEssentials: [
		p_catfood_default,
		p_toys_default,
		p_accessories_default
	],
	meals: [
		p_catfood_default,
		crunch(0),
		pack(2),
		p_health_default
	],
	center: [
		p_dogfood_default,
		p_catfood_default,
		p_grooming_default
	],
	groom: [
		p_grooming_default,
		grooming_hero_default,
		p_health_default,
		p_accessories_default
	],
	explore: [
		hero_pets_default,
		p_dogfood_default,
		p_catfood_default,
		p_toys_default
	],
	app: grooming_hero_default,
	bed
};
//#endregion
//#region src/components/home/shared.tsx
function useReducedMotion() {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function Section({ id, title, children, className, bleed }) {
	return /* @__PURE__ */ jsxs("section", {
		id,
		className: cn("home-cv home-reveal mb-10 md:mb-14", bleed ? "" : "px-4 md:px-8 lg:px-[62px]", className),
		children: [title ? /* @__PURE__ */ jsx("h2", {
			className: "mb-4 text-left text-xl font-semibold text-[var(--home-ink)] md:text-[28px] md:font-medium",
			children: title
		}) : null, children]
	});
}
function HomeImage({ src, alt, className, priority = false }) {
	if (!src) return /* @__PURE__ */ jsx("div", {
		role: "img",
		"aria-label": alt,
		className: cn("h-full w-full bg-[var(--home-cream)]", className)
	});
	return /* @__PURE__ */ jsx("img", {
		src,
		alt,
		width: priority ? 1600 : 800,
		height: priority ? 700 : 600,
		loading: priority ? "eager" : "lazy",
		decoding: priority ? "sync" : "async",
		fetchPriority: priority ? "high" : "auto",
		className: cn("h-full w-full object-cover", className)
	});
}
var homeCard = "overflow-hidden rounded-xl border border-[var(--home-border)] bg-white transition-transform duration-200 hover:-translate-y-0.5";
var homeFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--home-orange)] focus-visible:ring-offset-2";
//#endregion
//#region src/components/home/AppBanner.tsx
var KEY = "nuzz-app-strip";
function AppNotice() {
	const [showStrip, setShowStrip] = useState(false);
	useEffect(() => {
		setShowStrip(window.sessionStorage.getItem(KEY) !== "1");
	}, []);
	if (!showStrip) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-3 bg-[var(--home-ink)] px-4 py-2 text-xs text-white md:hidden",
		children: [/* @__PURE__ */ jsx("p", { children: "Get order updates on your phone. Shop in the browser for now." }), /* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": "Dismiss app notice",
			className: cn("grid h-8 w-8 shrink-0 place-items-center", homeFocus),
			onClick: () => {
				window.sessionStorage.setItem(KEY, "1");
				setShowStrip(false);
			},
			children: /* @__PURE__ */ jsx(X, { size: 14 })
		})]
	});
}
function AppBanner() {
	return /* @__PURE__ */ jsx("section", {
		className: "mb-8 md:mb-10",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/account/login",
			"aria-label": "Create an account",
			className: "block",
			children: /* @__PURE__ */ jsx("div", {
				className: "aspect-[16/7] bg-[var(--home-navy)] md:aspect-[21/5]",
				children: /* @__PURE__ */ jsx(HomeImage, {
					src: homeImages.app,
					alt: "Join The Nuzz Story"
				})
			})
		})
	});
}
//#endregion
//#region src/components/home/BrandFeature.tsx
var cards$1 = [
	{
		title: "Dry meals",
		slug: "dog-food",
		image: homeImages.brandCards[0]
	},
	{
		title: "Crunchy treats",
		slug: "dog-food",
		image: homeImages.brandCards[1]
	},
	{
		title: "Cat food",
		slug: "cat-food",
		image: homeImages.brandCards[2]
	},
	{
		title: "Daily care",
		slug: "healthcare",
		image: homeImages.brandCards[3]
	}
];
function BrandFeature() {
	return /* @__PURE__ */ jsx("section", {
		className: "home-cv home-reveal mb-10 bg-[var(--home-navy)] text-white md:mb-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid md:grid-cols-[46%_1fr]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "aspect-[4/3] md:aspect-auto md:min-h-[420px]",
				children: /* @__PURE__ */ jsx(HomeImage, {
					src: homeImages.brand,
					alt: "Featured pet food"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "px-5 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-semibold md:text-[28px] md:font-medium",
						children: "Up to 20% off"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-md text-sm text-white/80",
						children: "House staples and everyday food, priced for the week. Use PAW20 on orders above ₹999."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "home-scroller mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar md:grid md:grid-cols-4 md:overflow-visible",
						children: cards$1.map((card) => /* @__PURE__ */ jsxs(Link, {
							to: "/category/$slug",
							params: { slug: card.slug },
							className: cn(homeCard, "w-[46%] shrink-0 snap-start text-[var(--home-text)] md:w-auto"),
							children: [/* @__PURE__ */ jsx("div", {
								className: "aspect-square",
								children: /* @__PURE__ */ jsx(HomeImage, {
									src: card.image,
									alt: ""
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-3",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold",
									children: card.title
								}), /* @__PURE__ */ jsx("span", {
									className: "mt-2 inline-block rounded-full bg-[var(--home-cream)] px-2 py-0.5 text-[11px] font-semibold",
									children: "Up to 20% off"
								})]
							})]
						}, card.title))
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/category/$slug",
						params: { slug: "dog-food" },
						className: cn("mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--home-yellow)] px-5 py-3 text-sm font-semibold text-[var(--home-ink)]", homeFocus),
						children: ["Shop the edit ", /* @__PURE__ */ jsx(ArrowRight, { size: 16 })]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/home/BrandLogos.tsx
var fallback = [
	"The Nuzz Story",
	"Purrfect Co",
	"Trotters",
	"VetNest",
	"Playpaws",
	"Fluffly"
];
function BrandLogos() {
	const { products, catalogLoading } = useStore();
	const brands = useMemo(() => {
		const names = [...new Set(products.map((p) => p.brand))].slice(0, 6);
		return names.length ? names : fallback;
	}, [products]);
	return /* @__PURE__ */ jsx(Section, {
		title: "Brands on bigger deals",
		children: /* @__PURE__ */ jsx("div", {
			className: "home-scroller flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar md:grid md:grid-cols-6",
			children: (catalogLoading ? fallback : brands).map((brand) => /* @__PURE__ */ jsxs(Link, {
				to: "/category/$slug",
				params: { slug: "dog-food" },
				className: `${homeCard} flex aspect-[3/2] w-[46%] shrink-0 snap-start flex-col items-center justify-center px-3 text-center text-sm font-semibold md:w-auto`,
				children: [/* @__PURE__ */ jsx("span", {
					className: "grid h-12 w-12 place-items-center rounded-full bg-[var(--home-cream)] text-lg",
					children: brand.charAt(0)
				}), /* @__PURE__ */ jsx("span", {
					className: "mt-2 line-clamp-2",
					children: brand
				})]
			}, brand))
		})
	});
}
//#endregion
//#region src/components/home/CardRow.tsx
function CardRow({ title, items, columns, scroller }) {
	return /* @__PURE__ */ jsx(Section, {
		title,
		children: /* @__PURE__ */ jsx("div", {
			className: cn(scroller ? "home-scroller flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar" : cn("grid gap-3", columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-4")),
			children: items.map((item) => /* @__PURE__ */ jsxs(Link, {
				to: "/category/$slug",
				params: { slug: item.slug },
				className: cn(homeCard, scroller && "w-[42%] shrink-0 snap-start md:w-[calc((100%-2.25rem)/4)]"),
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[4/3]",
					children: /* @__PURE__ */ jsx(HomeImage, {
						src: item.image,
						alt: item.title
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-3",
					children: [
						item.eyebrow ? /* @__PURE__ */ jsx("p", {
							className: "text-[11px] font-semibold uppercase tracking-wide",
							style: { color: item.eyebrowColor ?? "var(--home-orange)" },
							children: item.eyebrow
						}) : null,
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-semibold",
							children: [
								item.title,
								" ",
								/* @__PURE__ */ jsx("span", {
									"aria-hidden": true,
									children: "→"
								})
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: "Shop now"
						})
					]
				})]
			}, item.title))
		})
	});
}
//#endregion
//#region src/components/home/CategoryTiles.tsx
var tiles = [
	{
		label: "Offer Zone",
		slug: "dog-food",
		image: homeImages.tiles[0]
	},
	{
		label: "Fresh Food",
		slug: "dog-food",
		image: homeImages.tiles[1]
	},
	{
		label: "Combos",
		slug: "cat-food",
		image: homeImages.tiles[2]
	},
	{
		label: "Treats",
		slug: "dog-food",
		image: homeImages.tiles[3]
	},
	{
		label: "Cat Toys",
		slug: "toys",
		image: homeImages.tiles[4]
	},
	{
		label: "Scratchers",
		slug: "toys",
		image: homeImages.tiles[5]
	},
	{
		label: "Best Sellers",
		slug: "cat-food",
		image: homeImages.tiles[6]
	},
	{
		label: "New Arrivals",
		slug: "accessories",
		image: homeImages.tiles[7]
	}
];
function CategoryTiles() {
	return /* @__PURE__ */ jsx("section", {
		"aria-label": "Quick categories",
		className: "relative z-10 -mt-10 px-4 md:-mt-24 md:px-8 lg:px-[62px]",
		children: /* @__PURE__ */ jsx("div", {
			className: "home-scroller flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar",
			children: tiles.map((tile) => /* @__PURE__ */ jsxs(Link, {
				to: "/category/$slug",
				params: { slug: tile.slug },
				className: `${homeCard} w-[26%] shrink-0 snap-start bg-white md:w-[calc((100%-1.75rem)/8)]`,
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-square",
					children: /* @__PURE__ */ jsx(HomeImage, {
						src: tile.image,
						alt: ""
					})
				}), /* @__PURE__ */ jsx("p", {
					className: "px-1 py-2 text-center text-[11px] font-medium md:text-xs",
					children: tile.label
				})]
			}, tile.label))
		})
	});
}
//#endregion
//#region src/components/home/CenterCarousel.tsx
var slides$1 = [
	{
		title: "For the dogs",
		slug: "dog-food",
		image: homeImages.center[0]
	},
	{
		title: "For the cats",
		slug: "cat-food",
		image: homeImages.center[1]
	},
	{
		title: "For grooming day",
		slug: "dog-grooming",
		image: homeImages.center[2]
	}
];
function CenterCarousel() {
	const scroller = useRef(null);
	const reduced = useReducedMotion();
	function go(dir) {
		const el = scroller.current;
		const card = el?.querySelector("[data-slide]");
		if (!el || !(card instanceof HTMLElement)) return;
		el.scrollBy({
			left: dir * (card.offsetWidth + 16),
			behavior: reduced ? "auto" : "smooth"
		});
	}
	const loop = [...slides$1, ...slides$1];
	return /* @__PURE__ */ jsx(Section, {
		title: "For every kind of pet",
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ jsx("div", {
					ref: scroller,
					className: "home-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8%] no-scrollbar md:px-[18%]",
					children: loop.map((slide, i) => /* @__PURE__ */ jsxs(Link, {
						"data-slide": true,
						to: "/category/$slug",
						params: { slug: slide.slug },
						className: "w-[78%] shrink-0 snap-center overflow-hidden rounded-xl md:w-[52%]",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-[16/9]",
							children: /* @__PURE__ */ jsx(HomeImage, {
								src: slide.image,
								alt: slide.title
							})
						}), /* @__PURE__ */ jsx("p", {
							className: "bg-[var(--home-ink)] px-4 py-3 text-sm font-semibold text-white",
							children: slide.title
						})]
					}, `${slide.title}-${i}`))
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Previous story",
					onClick: () => go(-1),
					className: cn("absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white md:grid", homeFocus),
					children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Next story",
					onClick: () => go(1),
					className: cn("absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white md:grid", homeFocus),
					children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
				})
			]
		})
	});
}
//#endregion
//#region src/components/home/ExploreGrid.tsx
var cards = [
	{
		title: "Store floor",
		caption: "A walk through the shelves",
		slug: "dog-food",
		image: homeImages.explore[0]
	},
	{
		title: "Meal time",
		caption: "How we pick everyday food",
		slug: "cat-food",
		image: homeImages.explore[1]
	},
	{
		title: "Cat corner",
		caption: "Quiet picks for indoor cats",
		slug: "toys",
		image: homeImages.explore[2]
	},
	{
		title: "Play hour",
		caption: "Toys that survive zoomies",
		slug: "toys",
		image: homeImages.explore[3]
	}
];
function ExploreGrid() {
	return /* @__PURE__ */ jsx(Section, {
		title: "Explore our world",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: cards.map((card) => /* @__PURE__ */ jsxs(Link, {
				to: "/category/$slug",
				params: { slug: card.slug },
				className: homeCard,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative aspect-[3/4]",
					children: [/* @__PURE__ */ jsx(HomeImage, {
						src: card.image,
						alt: card.caption
					}), /* @__PURE__ */ jsxs("span", {
						className: "absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-white/90",
						children: [/* @__PURE__ */ jsx(Play, {
							size: 14,
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: "Play preview"
						})]
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "px-3 py-3 text-sm font-medium",
					children: card.caption
				})]
			}, card.title))
		})
	});
}
//#endregion
//#region src/components/home/GroomingCards.tsx
function GroomingCards() {
	const services = groomingServices.slice(0, 4);
	return /* @__PURE__ */ jsx(Section, {
		title: "Easy booking for gentle grooming",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: services.map((service, i) => /* @__PURE__ */ jsxs(Link, {
				to: "/grooming",
				className: "overflow-hidden rounded-xl bg-[var(--home-ink)] text-[var(--home-cream)]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-square",
					children: /* @__PURE__ */ jsx(HomeImage, {
						src: homeImages.groom[i],
						alt: ""
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-white",
						children: service.name
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-[var(--home-cream)]",
						children: service.duration
					})]
				})]
			}, service.id))
		})
	});
}
//#endregion
//#region src/components/home/HeroCarousel.tsx
var slides = [
	{
		title: "Bowls worth barking about",
		subtitle: "Dog food, treats and everyday care",
		slug: "dog-food",
		image: homeImages.hero[0] ?? ""
	},
	{
		title: "Cat meals they finish",
		subtitle: "Food, toppers and treats",
		slug: "cat-food",
		image: homeImages.hero[1] ?? ""
	},
	{
		title: "A calmer grooming day",
		subtitle: "Book a gentle in-store session",
		slug: "dog-grooming",
		image: homeImages.hero[2] ?? ""
	},
	{
		title: "Play, beds and extras",
		subtitle: "Toys and accessories for both",
		slug: "toys",
		image: homeImages.hero[3] ?? ""
	}
];
function HeroCarousel() {
	const scroller = useRef(null);
	const [index, setIndex] = useState(0);
	const reduced = useReducedMotion();
	useEffect(() => {
		const el = scroller.current;
		if (!el) return;
		const onScroll = () => {
			const width = el.clientWidth || 1;
			setIndex(Math.round(el.scrollLeft / width));
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		const el = scroller.current;
		if (!el || reduced) return;
		let visible = true;
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry?.isIntersecting ?? false;
		}, { threshold: .35 });
		observer.observe(el);
		const id = window.setInterval(() => {
			if (!visible || document.hidden) return;
			const next = (index + 1) % slides.length;
			el.scrollTo({
				left: next * el.clientWidth,
				behavior: "smooth"
			});
		}, 6500);
		return () => {
			window.clearInterval(id);
			observer.disconnect();
		};
	}, [index, reduced]);
	function go(next) {
		const el = scroller.current;
		if (!el) return;
		const wrapped = (next + slides.length) % slides.length;
		el.scrollTo({
			left: wrapped * el.clientWidth,
			behavior: reduced ? "auto" : "smooth"
		});
	}
	return /* @__PURE__ */ jsxs("section", {
		"aria-roledescription": "carousel",
		"aria-label": "Featured",
		className: "relative",
		children: [
			/* @__PURE__ */ jsx("div", {
				ref: scroller,
				className: "home-scroller flex snap-x snap-mandatory overflow-x-auto no-scrollbar",
				children: slides.map((slide, i) => /* @__PURE__ */ jsxs(Link, {
					to: "/category/$slug",
					params: { slug: slide.slug },
					className: "relative block aspect-[4/5] w-full shrink-0 snap-start sm:aspect-[16/8] md:aspect-[21/8]",
					"aria-label": slide.title,
					children: [
						/* @__PURE__ */ jsx(HomeImage, {
							src: slide.image,
							alt: "",
							priority: i === 0,
							className: "absolute inset-0"
						}),
						/* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" }),
						/* @__PURE__ */ jsxs("span", {
							className: "absolute bottom-16 left-5 right-5 text-white md:bottom-28 md:left-[62px]",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block max-w-xl text-3xl font-semibold leading-tight md:text-5xl",
								children: slide.title
							}), /* @__PURE__ */ jsx("span", {
								className: "mt-2 block text-sm md:text-base",
								children: slide.subtitle
							})]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "sr-only",
							children: ["Slide ", i + 1]
						})
					]
				}, slide.title))
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Previous slide",
				onClick: () => go(index - 1),
				className: cn("absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white md:grid", homeFocus),
				children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Next slide",
				onClick: () => go(index + 1),
				className: cn("absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white md:grid", homeFocus),
				children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute bottom-4 left-0 right-0 flex justify-center gap-2",
				children: slides.map((slide, i) => /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": `Go to slide ${i + 1}`,
					onClick: () => go(i),
					className: cn("h-2 rounded-full", i === index ? "w-6 bg-white" : "w-2 bg-white/60")
				}, slide.title))
			})
		]
	});
}
//#endregion
//#region src/components/home/ImageGrid.tsx
function ImageGrid({ title, items }) {
	return /* @__PURE__ */ jsx(Section, {
		title,
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: items.map((item) => /* @__PURE__ */ jsxs(Link, {
				to: "/category/$slug",
				params: { slug: item.slug },
				className: homeCard,
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[4/3]",
					children: /* @__PURE__ */ jsx(HomeImage, {
						src: item.image,
						alt: item.title
					})
				}), /* @__PURE__ */ jsxs("p", {
					className: "px-3 py-3 text-sm font-semibold",
					children: [
						item.title,
						" ",
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": true,
							children: "→"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: "Shop now"
						})
					]
				})]
			}, item.title))
		})
	});
}
//#endregion
//#region src/components/home/MainHeader.tsx
function MainHeader({ onMenu }) {
	const { products, cartCount, setCartOpen, wishlist, user } = useStore();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [pin, setPin] = useState("");
	const [pinOpen, setPinOpen] = useState(false);
	const [pinNote, setPinNote] = useState("");
	const hits = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (q.length < 2) return [];
		return products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0, 6);
	}, [products, query]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2 bg-white px-4 py-3 md:gap-3 md:px-5 lg:gap-4 lg:px-[62px]",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("grid h-10 w-10 place-items-center rounded-lg border border-[var(--home-border)] md:hidden", homeFocus),
				"aria-label": "Open menu",
				onClick: onMenu,
				children: /* @__PURE__ */ jsxs("span", {
					className: "flex w-4 flex-col gap-1",
					"aria-hidden": true,
					children: [
						/* @__PURE__ */ jsx("span", { className: "h-0.5 bg-[var(--home-ink)]" }),
						/* @__PURE__ */ jsx("span", { className: "h-0.5 bg-[var(--home-ink)]" }),
						/* @__PURE__ */ jsx("span", { className: "h-0.5 bg-[var(--home-ink)]" })
					]
				})
			}),
			/* @__PURE__ */ jsx(BrandLockup, {
				compact: true,
				className: "max-md:[&_span]:hidden"
			}),
			/* @__PURE__ */ jsxs("form", {
				className: "relative min-w-0 flex-1",
				onSubmit: (e) => {
					e.preventDefault();
					const first = hits[0];
					if (first) navigate({
						to: "/product/$slug",
						params: { slug: first.slug }
					});
				},
				children: [
					/* @__PURE__ */ jsx("label", {
						className: "sr-only",
						htmlFor: "home-search",
						children: "Search products"
					}),
					/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--home-muted)]"
					}),
					/* @__PURE__ */ jsx("input", {
						id: "home-search",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search products",
						className: cn("h-11 w-full rounded-full border border-[var(--home-border)] bg-[var(--home-bg)] pl-10 pr-4 text-sm outline-none", homeFocus)
					}),
					hits.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-[var(--home-border)] bg-white shadow-md",
						children: hits.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
							to: "/product/$slug",
							params: { slug: p.slug },
							className: "flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--home-bg)]",
							onClick: () => setQuery(""),
							children: [
								/* @__PURE__ */ jsx("img", {
									src: resolveCatalogImage(p.image, p.category),
									alt: "",
									loading: "lazy",
									className: "h-10 w-10 rounded-md object-cover"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "min-w-0 flex-1 truncate",
									children: p.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: money(p.price)
								})
							]
						}) }, p.slug))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative hidden lg:block",
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: cn("flex h-11 items-center gap-2 rounded-full border border-[var(--home-border)] px-3 text-sm", homeFocus),
					"aria-expanded": pinOpen,
					onClick: () => setPinOpen((v) => !v),
					children: [/* @__PURE__ */ jsx(MapPin, { size: 16 }), /* @__PURE__ */ jsx("span", { children: pin || "Pincode" })]
				}), pinOpen && /* @__PURE__ */ jsxs("form", {
					className: "absolute right-0 top-[calc(100%+6px)] z-30 w-56 rounded-xl border border-[var(--home-border)] bg-white p-3 shadow-md",
					onSubmit: (e) => {
						e.preventDefault();
						setPinNote(/^\d{6}$/.test(pin) ? `We deliver to ${pin}.` : "Enter a valid 6-digit pincode.");
					},
					children: [
						/* @__PURE__ */ jsx("label", {
							className: "text-xs font-medium text-[var(--home-muted)]",
							htmlFor: "home-pin",
							children: "Delivery pincode"
						}),
						/* @__PURE__ */ jsx("input", {
							id: "home-pin",
							inputMode: "numeric",
							maxLength: 6,
							value: pin,
							onChange: (e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6)),
							className: "mt-1 h-10 w-full rounded-lg border border-[var(--home-border)] px-3 text-sm"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: cn("mt-2 h-10 w-full rounded-lg bg-[var(--home-orange)] text-sm font-semibold text-white", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--home-orange)] focus-visible:ring-offset-2"),
							children: "Check"
						}),
						pinNote ? /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-xs text-[var(--home-muted)]",
							children: pinNote
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ jsxs(Link, {
				to: "/account/wishlist",
				"aria-label": `Wishlist, ${wishlist.length} items`,
				className: cn("relative grid h-10 w-10 place-items-center rounded-lg", homeFocus),
				children: [/* @__PURE__ */ jsx(Heart, { size: 20 }), wishlist.length > 0 && /* @__PURE__ */ jsx("span", {
					className: "absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--home-orange)] px-1 text-[10px] font-bold text-white",
					children: wishlist.length
				})]
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				"aria-label": `Open cart, ${cartCount} items`,
				onClick: () => setCartOpen(true),
				className: cn("relative grid h-10 w-10 place-items-center rounded-lg", homeFocus),
				children: [/* @__PURE__ */ jsx(ShoppingCart, { size: 20 }), cartCount > 0 && /* @__PURE__ */ jsx("span", {
					className: "absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--home-orange)] px-1 text-[10px] font-bold text-white",
					children: cartCount
				})]
			}),
			/* @__PURE__ */ jsxs(Link, {
				to: user ? "/account/profile" : "/account/login",
				"aria-label": user ? "Account" : "Log in",
				className: cn("hidden h-10 items-center gap-1 rounded-lg px-2 text-sm font-medium md:flex", homeFocus),
				children: [/* @__PURE__ */ jsx(User, { size: 18 }), /* @__PURE__ */ jsx("span", {
					className: "hidden max-w-24 truncate lg:inline",
					children: user ? user.name : "Account"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/home/MegaMenu.tsx
var dogColumns = [
	{
		title: "Food",
		links: [{
			label: "Dog food",
			slug: "dog-food"
		}, {
			label: "Healthcare",
			slug: "healthcare"
		}]
	},
	{
		title: "Care",
		links: [{
			label: "Grooming",
			slug: "dog-grooming"
		}, {
			label: "Dog wear",
			slug: "dog-wear"
		}]
	},
	{
		title: "Home",
		links: [
			{
				label: "Toys",
				slug: "toys"
			},
			{
				label: "Beds",
				slug: "beds"
			},
			{
				label: "Accessories",
				slug: "accessories"
			}
		]
	}
];
var catColumns = [
	{
		title: "Food",
		links: [{
			label: "Cat food",
			slug: "cat-food"
		}, {
			label: "Healthcare",
			slug: "healthcare"
		}]
	},
	{
		title: "Care",
		links: [{
			label: "Grooming",
			slug: "cat-grooming"
		}]
	},
	{
		title: "Home",
		links: [
			{
				label: "Toys",
				slug: "toys"
			},
			{
				label: "Beds",
				slug: "beds"
			},
			{
				label: "Accessories",
				slug: "accessories"
			}
		]
	}
];
function Menu$1({ label, columns }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "group relative",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: cn("px-3 py-3 text-sm font-medium", homeFocus),
			"aria-haspopup": "true",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "invisible absolute left-0 top-full z-30 hidden min-w-[520px] rounded-xl border border-[var(--home-border)] bg-white p-5 opacity-0 shadow-md transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 md:grid md:grid-cols-3 md:gap-4",
			children: columns.map((col) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold uppercase tracking-wide text-[var(--home-muted)]",
				children: col.title
			}), /* @__PURE__ */ jsx("ul", {
				className: "mt-2 grid gap-1",
				children: col.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
					to: "/category/$slug",
					params: { slug: link.slug },
					className: "block rounded-md px-1 py-1 text-sm hover:text-[var(--home-orange)]",
					children: link.label
				}) }, link.label))
			})] }, col.title))
		})]
	});
}
function MegaMenu() {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Categories",
		className: "hidden border-t border-[var(--home-border)] bg-white px-5 md:block lg:px-[62px]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-1",
			children: [
				/* @__PURE__ */ jsx(Menu$1, {
					label: "Dogs",
					columns: dogColumns
				}),
				/* @__PURE__ */ jsx(Menu$1, {
					label: "Cats",
					columns: catColumns
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/category/$slug",
					params: { slug: "dog-food" },
					className: cn("px-3 py-3 text-sm font-medium", homeFocus),
					children: "Brands"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/grooming",
					className: cn("px-3 py-3 text-sm font-medium", homeFocus),
					children: "Grooming"
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/category/$slug",
					params: { slug: "dog-food" },
					className: cn("inline-flex items-center gap-2 px-3 py-3 text-sm font-medium", homeFocus),
					children: ["Offer Zone", /* @__PURE__ */ jsx("span", {
						className: "rounded-full bg-[var(--home-orange)] px-2 py-0.5 text-[10px] font-bold text-white",
						children: "Up to 20% off"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/home/MobileNav.tsx
var drawerLinks = [
	{
		label: "Dog food",
		slug: "dog-food"
	},
	{
		label: "Cat food",
		slug: "cat-food"
	},
	{
		label: "Grooming salon",
		to: "/grooming"
	},
	{
		label: "Toys",
		slug: "toys"
	},
	{
		label: "Beds",
		slug: "beds"
	},
	{
		label: "Dog wear",
		slug: "dog-wear"
	},
	{
		label: "Healthcare",
		slug: "healthcare"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
function MobileNav({ open, onClose, onOpen, pet, onPet }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "flex gap-2 bg-white px-5 pb-3 md:hidden",
			children: [
				"all",
				"dog",
				"cat"
			].map((id) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onPet(id),
				className: cn("rounded-full px-4 py-1.5 text-sm font-medium", homeFocus, pet === id ? "bg-[var(--home-orange)] text-white shadow-md" : "bg-[var(--home-bg)] text-[var(--home-text)]"),
				children: id === "all" ? "All" : id === "dog" ? "Dogs" : "Cats"
			}, id))
		}),
		open && /* @__PURE__ */ jsxs("div", {
			className: "fixed inset-0 z-[55] md:hidden",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Close menu",
				className: "absolute inset-0 bg-black/40",
				onClick: onClose
			}), /* @__PURE__ */ jsxs("aside", {
				className: "absolute inset-y-0 left-0 flex w-[min(100%,320px)] flex-col bg-white p-5 shadow-xl",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg font-semibold",
						children: "Menu"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Close menu",
						onClick: onClose,
						className: cn("grid h-10 w-10 place-items-center", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--home-orange)] focus-visible:ring-offset-2"),
						children: /* @__PURE__ */ jsx(X, { size: 18 })
					})]
				}), /* @__PURE__ */ jsx("nav", {
					className: "mt-4 grid gap-1",
					"aria-label": "Mobile categories",
					children: drawerLinks.map((link) => link.slug ? /* @__PURE__ */ jsx(Link, {
						to: "/category/$slug",
						params: { slug: link.slug },
						onClick: onClose,
						className: "rounded-lg px-2 py-3 text-sm font-medium hover:bg-[var(--home-bg)]",
						children: link.label
					}, link.label) : /* @__PURE__ */ jsx(Link, {
						to: link.to ?? "/",
						onClick: onClose,
						className: "rounded-lg px-2 py-3 text-sm font-medium hover:bg-[var(--home-bg)]",
						children: link.label
					}, link.label))
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Primary",
			className: "fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-[var(--home-border)] bg-white py-2 md:hidden",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "grid place-items-center gap-1 text-[11px] font-medium text-[var(--home-orange)]",
					children: [/* @__PURE__ */ jsx(Home$1, { size: 18 }), " Home"]
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: onOpen,
					className: "grid place-items-center gap-1 text-[11px] font-medium",
					children: [/* @__PURE__ */ jsx(LayoutGrid, { size: 18 }), " Category"]
				}),
				/* @__PURE__ */ jsxs("a", {
					href: "#offers",
					className: "grid place-items-center gap-1 text-[11px] font-medium",
					children: [/* @__PURE__ */ jsx(Tag, { size: 18 }), " Offers"]
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/account/profile",
					className: "grid place-items-center gap-1 text-[11px] font-medium",
					children: [/* @__PURE__ */ jsx(User, { size: 18 }), " Account"]
				})
			]
		})
	] });
}
//#endregion
//#region src/components/home/ProductTabsCarousel.tsx
var tabs = [
	{
		id: "toys",
		label: "Cat Toys"
	},
	{
		id: "litter",
		label: "Litter Trays"
	},
	{
		id: "treats",
		label: "Cat Treats"
	},
	{
		id: "beds",
		label: "Cat Beds"
	}
];
var ProductSlide = memo(function ProductSlide({ product, onAdd }) {
	const off = product.mrp > 0 ? Math.round((product.mrp - product.price) / product.mrp * 100) : 0;
	return /* @__PURE__ */ jsxs("article", {
		"data-card": true,
		className: cn(homeCard, "flex w-[42%] shrink-0 snap-start flex-col md:w-[calc((100%-3rem)/5.5)]"),
		children: [
			/* @__PURE__ */ jsxs(Link, {
				to: "/product/$slug",
				params: { slug: product.slug },
				className: "relative block aspect-square",
				children: [
					off > 0 && /* @__PURE__ */ jsxs("span", {
						className: "absolute left-2 top-2 rounded-full bg-[var(--home-orange)] px-2 py-0.5 text-[10px] font-bold text-white",
						children: [off, "% off"]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "absolute bottom-2 right-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold",
						children: product.rating.toFixed(1)
					}),
					/* @__PURE__ */ jsx("img", {
						src: resolveCatalogImage(product.image, product.category),
						alt: product.name,
						width: 480,
						height: 480,
						loading: "lazy",
						decoding: "async",
						className: "h-full w-full object-cover"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-col gap-1 p-3",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] uppercase tracking-wide text-[var(--home-muted)]",
						children: product.brand
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/product/$slug",
						params: { slug: product.slug },
						className: "line-clamp-2 text-sm font-medium",
						children: product.name
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-auto text-sm font-semibold",
						children: [
							money(product.price),
							" ",
							product.mrp > product.price && /* @__PURE__ */ jsxs(Fragment, { children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-normal text-[var(--home-muted)] line-through",
									children: money(product.mrp)
								}),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "text-[var(--home-green)]",
									children: [
										"(",
										off,
										"%)"
									]
								})
							] })
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("h-10 w-full bg-[var(--home-orange)] text-sm font-semibold text-white", homeFocus),
				"aria-label": `Add ${product.name} to cart`,
				onClick: () => onAdd(product),
				children: "Add"
			})
		]
	});
});
function matches(product, tab, pet) {
	const name = `${product.name} ${product.type}`.toLowerCase();
	if (pet === "dog") {
		if (product.pet === "cat") return false;
		if (tab === "toys") return product.category === "toys";
		if (tab === "litter") return product.category === "accessories";
		if (tab === "treats") return product.category === "dog-food" && /treat|krunch|dehydrated/.test(name);
		return product.category === "beds" || product.category === "dog-wear";
	}
	if (product.pet === "dog" && product.category !== "toys" && product.category !== "beds") return false;
	if (tab === "toys") return product.category === "toys";
	if (tab === "litter") return /litter|tray|access/.test(name) || product.category === "accessories";
	if (tab === "treats") return product.category === "cat-food";
	return product.category === "beds";
}
function ProductTabsCarousel({ pet }) {
	const { products, catalogLoading, addToCart } = useStore();
	const [tab, setTab] = useState("toys");
	const scroller = useRef(null);
	const [progress, setProgress] = useState(0);
	const visible = useMemo(() => {
		const list = products.filter((p) => matches(p, tab, pet));
		return (list.length ? list : products).slice(0, 12);
	}, [
		products,
		tab,
		pet
	]);
	function scrollByDir(dir) {
		const el = scroller.current;
		const card = el?.querySelector("[data-card]");
		if (!el || !(card instanceof HTMLElement)) return;
		el.scrollBy({
			left: dir * (card.offsetWidth + 12),
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ jsxs(Section, {
		title: "Quick add-to-carts",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "home-scroller mb-4 flex gap-2 overflow-x-auto no-scrollbar",
				role: "tablist",
				"aria-label": "Product groups",
				children: tabs.map((item) => /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === item.id,
					onClick: () => setTab(item.id),
					className: cn("shrink-0 rounded-full px-4 py-2 text-sm font-medium", homeFocus, tab === item.id ? "bg-[var(--home-orange)] text-white shadow" : "bg-[var(--home-bg)]"),
					children: pet === "dog" && item.id === "treats" ? "Dog Treats" : pet === "dog" && item.id === "beds" ? "Dog Beds" : item.label
				}, item.id))
			}),
			/* @__PURE__ */ jsx("div", {
				ref: scroller,
				onScroll: (e) => {
					const el = e.currentTarget;
					const max = el.scrollWidth - el.clientWidth;
					setProgress(max <= 0 ? 1 : el.scrollLeft / max);
				},
				className: "home-scroller flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar",
				children: catalogLoading ? Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ jsx("div", { className: "h-72 w-[46%] shrink-0 animate-pulse rounded-xl bg-[var(--home-bg)] md:w-[calc((100%-3rem)/5.5)]" }, i)) : visible.map((product) => /* @__PURE__ */ jsx(ProductSlide, {
					product,
					onAdd: addToCart
				}, product.slug))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-1 flex-1 overflow-hidden rounded-full bg-[var(--home-border)]",
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full w-full origin-left bg-[var(--home-orange)]",
							style: { transform: `scaleX(${Math.max(progress, .08)})` }
						})
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Previous products",
						onClick: () => scrollByDir(-1),
						className: cn("grid h-9 w-9 place-items-center rounded-full border border-[var(--home-border)]", homeFocus),
						children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Next products",
						onClick: () => scrollByDir(1),
						className: cn("grid h-9 w-9 place-items-center rounded-full border border-[var(--home-border)]", homeFocus),
						children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/home/PromoBanner.tsx
function PromoBanner() {
	return /* @__PURE__ */ jsx("section", {
		id: "offers",
		className: "home-cv home-reveal mb-10 md:mb-14",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/category/$slug",
			params: { slug: "dog-food" },
			"aria-label": "Shop this week's offers",
			className: "block",
			children: /* @__PURE__ */ jsx("div", {
				className: "aspect-[16/7] md:aspect-[21/6]",
				children: /* @__PURE__ */ jsx(HomeImage, {
					src: homeImages.promo,
					alt: "This week at The Nuzz Story"
				})
			})
		})
	});
}
//#endregion
//#region src/components/home/TopBar.tsx
function TopBar() {
	return /* @__PURE__ */ jsxs("div", {
		className: "hidden items-center justify-between gap-4 bg-[var(--home-ink)] px-5 py-1.5 text-[11px] text-white md:flex lg:px-[62px]",
		children: [/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Store links",
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/about",
					className: "hover:text-[var(--home-cream)]",
					children: "Adopt"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/contact",
					className: "hover:text-[var(--home-cream)]",
					children: "Store locator"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/account/orders",
					className: "hover:text-[var(--home-cream)]",
					children: "Track order"
				})
			]
		}), /* @__PURE__ */ jsx("p", { children: "Free delivery above ₹499 · Subscribe & Save 10%" })]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var PetContext = createContext(null);
function PetProvider({ children }) {
	const [pet, setPet] = useState("all");
	return /* @__PURE__ */ jsx(PetContext.Provider, {
		value: {
			pet,
			setPet
		},
		children
	});
}
function usePetFilter() {
	const value = useContext(PetContext);
	if (!value) throw new Error("Pet filter is only available on the home page");
	return value;
}
function HomeHeader() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { pet, setPet } = usePetFilter();
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-40 bg-white",
		children: [
			/* @__PURE__ */ jsx(AppNotice, {}),
			/* @__PURE__ */ jsx(TopBar, {}),
			/* @__PURE__ */ jsx(MainHeader, { onMenu: () => setMenuOpen(true) }),
			/* @__PURE__ */ jsx(MegaMenu, {}),
			/* @__PURE__ */ jsx(MobileNav, {
				open: menuOpen,
				onOpen: () => setMenuOpen(true),
				onClose: () => setMenuOpen(false),
				pet,
				onPet: setPet
			})
		]
	});
}
function HomeProducts() {
	const { pet } = usePetFilter();
	return /* @__PURE__ */ jsx(ProductTabsCarousel, { pet });
}
function Home() {
	return /* @__PURE__ */ jsx(PetProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: "home-shell pb-16 md:pb-0",
		children: [
			/* @__PURE__ */ jsx(HomeHeader, {}),
			/* @__PURE__ */ jsx(HeroCarousel, {}),
			/* @__PURE__ */ jsx(CategoryTiles, {}),
			/* @__PURE__ */ jsx("div", { className: "h-8 md:h-10" }),
			/* @__PURE__ */ jsx(ImageGrid, {
				title: "Spoil them this week",
				items: [
					{
						title: "Dog food",
						slug: "dog-food",
						image: homeImages.spoil[0]
					},
					{
						title: "Dog treats",
						slug: "dog-food",
						image: homeImages.spoil[1]
					},
					{
						title: "Cat food",
						slug: "cat-food",
						image: homeImages.spoil[2]
					},
					{
						title: "Cat treats",
						slug: "cat-food",
						image: homeImages.spoil[3]
					}
				]
			}),
			/* @__PURE__ */ jsx(PromoBanner, {}),
			/* @__PURE__ */ jsx(BrandFeature, {}),
			/* @__PURE__ */ jsx(ImageGrid, {
				title: "Treats worth sharing",
				items: [
					{
						title: "Chewy bites",
						slug: "dog-food",
						image: homeImages.treats[0]
					},
					{
						title: "Crunch cups",
						slug: "dog-food",
						image: homeImages.treats[1]
					},
					{
						title: "Cat nibbles",
						slug: "cat-food",
						image: homeImages.treats[2]
					},
					{
						title: "Training bites",
						slug: "dog-food",
						image: homeImages.treats[3]
					}
				]
			}),
			/* @__PURE__ */ jsx(CardRow, {
				title: "Essentials for every cat",
				columns: 3,
				items: [
					{
						title: "Everyday food",
						slug: "cat-food",
						image: homeImages.catEssentials[0]
					},
					{
						title: "Play",
						slug: "toys",
						image: homeImages.catEssentials[1]
					},
					{
						title: "Little extras",
						slug: "accessories",
						image: homeImages.catEssentials[2]
					}
				]
			}),
			/* @__PURE__ */ jsx(CardRow, {
				title: "Complete meals for cats",
				columns: 4,
				scroller: true,
				items: [
					{
						title: "Daily bowls",
						slug: "cat-food",
						image: homeImages.meals[0],
						eyebrow: "Food",
						eyebrowColor: "#ff6d1f"
					},
					{
						title: "Crunchy cups",
						slug: "cat-food",
						image: homeImages.meals[1],
						eyebrow: "Treats",
						eyebrowColor: "#008b44"
					},
					{
						title: "Toppers",
						slug: "cat-food",
						image: homeImages.meals[2],
						eyebrow: "Fresh",
						eyebrowColor: "#102242"
					},
					{
						title: "Care add-ons",
						slug: "healthcare",
						image: homeImages.meals[3],
						eyebrow: "Health",
						eyebrowColor: "#ff6d1f"
					}
				]
			}),
			/* @__PURE__ */ jsx(HomeProducts, {}),
			/* @__PURE__ */ jsx(BrandLogos, {}),
			/* @__PURE__ */ jsx(CenterCarousel, {}),
			/* @__PURE__ */ jsx(GroomingCards, {}),
			/* @__PURE__ */ jsx(ExploreGrid, {}),
			/* @__PURE__ */ jsx(AppBanner, {})
		]
	}) });
}
//#endregion
export { Home as component };
