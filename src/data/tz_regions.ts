import { IRegions } from "./types";

export const regions: IRegions[] = [
    {
        name: "Arusha",
        districts: [
            { name: "Arusha", municipals: ["Arusha Jiji"] },
            { name: "Arumeru", municipals: ["Arusha DC", "Meru DC"] },
            { name: "Ngorongoro", municipals: ["Ngorongoro DC"] },
            { name: "Longido", municipals: ["Longido DC"] },
            { name: "Monduli", municipals: ["Monduli DC"] },
            { name: "Karatu", municipals: ["Karatu DC"] }
        ]
    },
    {
        name: "Dar es Salaam",
        districts: [
            { name: "Kinondoni", municipals: ["Kinondoni MC"] },
            { name: "Ilala", municipals: ["Dar es Salaam Jiji", "Ilala MC"] },
            { name: "Temeke", municipals: ["Temeke MC"] },
            { name: "Kigamboni", municipals: ["Kigamboni MC"] },
            { name: "Ubungo", municipals: ["Ubungo MC"] }
        ]
    },
    {
        name: "Dodoma",
        districts: [
            { name: "Chamwino", municipals: ["Chamwino DC"] },
            { name: "Dodoma", municipals: ["Dodoma Jiji"] },
            { name: "Chemba", municipals: ["Chemba DC"] },
            { name: "Kondoa", municipals: ["Kondoa DC", "Kondoa Mji"] },
            { name: "Bahi", municipals: ["Bahi DC"] },
            { name: "Mpwapwa", municipals: ["Mpwapwa DC"] },
            { name: "Kongwa", municipals: ["Kongwa DC"] }
        ]
    },
    {
        name: "Geita",
        districts: [
            { name: "Bukombe", municipals: ["Bukombe DC"] },
            { name: "Mbogwe", municipals: ["Mbogwe DC"] },
            { name: "Nyangwale", municipals: ["Nyangwale DC"] },
            { name: "Geita", municipals: ["Geita DC", "Geita Mji"] },
            { name: "Chato", municipals: ["Chato DC"] }
        ]
    },
    {
        name: "Iringa",
        districts: [
            { name: "Mufindi", municipals: ["Mufindi DC", "Mafinga Mji"] },
            { name: "Kilolo", municipals: ["Kilolo DC"] },
            { name: "Iringa", municipals: ["Iringa DC", "Iringa MC"] }
        ]
    },
    {
        name: "Kagera",
        districts: [
            { name: "Biharamulo", municipals: ["Biharamulo DC"] },
            { name: "Karagwe", municipals: ["Karagwe DC"] },
            { name: "Muleba", municipals: ["Muleba DC"] },
            { name: "Kyerwa", municipals: ["Kyerwa DC"] },
            { name: "Bukoba", municipals: ["Bukoba DC", "Bukoba MC"] },
            { name: "Ngara", municipals: ["Ngara DC"] },
            { name: "Missenyi", municipals: ["Missenyi DC"] }
        ]
    },
    {
        name: "Katavi",
        districts: [
            { name: "Mlele", municipals: ["Mlele DC", "Mpimbwe DC"] },
            { name: "Mpanda", municipals: ["Mpanda MC", "Nsimbo DC"] },
            { name: "Tanganyika", municipals: ["Mpanda DC"] }
        ]
    },
    {
        name: "Kigoma",
        districts: [
            { name: "Kigoma", municipals: ["Kigoma DC", "Kigoma/Ujiji MC"] },
            { name: "Kasulu", municipals: ["Kasulu DC", "Kasulu TC"] },
            { name: "Kakonko", municipals: ["Kakonko DC"] },
            { name: "Uvinza", municipals: ["Uvinza DC"] },
            { name: "Buhigwe", municipals: ["Buhigwe DC"] },
            { name: "Kibondo", municipals: ["Kibondo DC"] }
        ]
    },
    {
        name: "Kilimanjaro",
        districts: [
            { name: "Siha", municipals: ["Siha DC"] },
            { name: "Moshi", municipals: ["Moshi MC", "Moshi DC"] },
            { name: "Mwanga", municipals: ["Mwanga DC"] },
            { name: "Rombo", municipals: ["Rombo DC"] },
            { name: "Hai", municipals: ["Hai DC"] },
            { name: "Same", municipals: ["Same DC"] }
        ]
    },
    {
        name: "Lindi",
        districts: [
            { name: "Nachingwea", municipals: ["Nachingwea DC"] },
            { name: "Ruangwa", municipals: ["Ruangwa DC"] },
            { name: "Liwale", municipals: ["Liwale DC"] },
            { name: "Lindi", municipals: ["Lindi MC", "Lindi DC"] },
            { name: "Kilwa", municipals: ["Kilwa DC"] }
        ]
    },
    {
        name: "Manyara",
        districts: [
            { name: "Babati", municipals: ["Babati TC", "Babati DC"] },
            { name: "Mbulu", municipals: ["Mbulu DC", "Mbulu Mji"] },
            { name: "Hanang", municipals: ["Hanang DC"] },
            { name: "Kiteto", municipals: ["Kiteto DC"] },
            { name: "Simanjiro", municipals: ["Simanjiro DC"] }
        ]
    },
    {
        name: "Mara",
        districts: [
            { name: "Rorya", municipals: ["Rorya DC"] },
            { name: "Serengeti", municipals: ["Serengeti DC"] },
            { name: "Bunda", municipals: ["Bunda DC", "Bunda Mji"] },
            { name: "Butiama", municipals: ["Butiama DC"] },
            { name: "Tarime", municipals: ["Tarime DC", "Tarime Mji"] },
            { name: "Musoma", municipals: ["Musoma MC", "Musoma DC"] }
        ]
    },
    {
        name: "Mbeya",
        districts: [
            { name: "Chunya", municipals: ["Chunya DC"] },
            { name: "Kyela", municipals: ["Kyela DC"] },
            { name: "Mbeya", municipals: ["Mbeya DC", "Mbeya Jiji"] },
            { name: "Rungwe", municipals: ["Rungwe DC", "Busokelo DC"] },
            { name: "Mbarali", municipals: ["Mbarali DC"] }
        ]
    },
    {
        name: "Morogoro",
        districts: [
            { name: "Gairo", municipals: ["Gairo DC"] },
            { name: "Kilombero", municipals: ["Kilombero DC", "Ifakara Mji"] },
            { name: "Mvomero", municipals: ["Mvomero DC"] },
            { name: "Morogoro", municipals: ["Morogoro DC", "Morogoro MC"] },
            { name: "Ulanga", municipals: ["Ulanga DC"] },
            { name: "Kilosa", municipals: ["Kilosa DC"] },
            { name: "Malinyi", municipals: ["Malinyi DC"] }
        ]
    },
    {
        name: "Mtwara",
        districts: [
            { name: "Newala", municipals: ["Newala DC", "Newala TC"] },
            { name: "Nanyumbu", municipals: ["Nanyumbu DC"] },
            { name: "Mtwara", municipals: ["Mtwara MC", "Mtwara DC", "Nanyamba Mji"] },
            { name: "Masasi", municipals: ["Masasi DC", "Masasi Mji"] },
            { name: "Tandahimba", municipals: ["Tandahimba DC"] }
        ]
    },
    {
        name: "Mwanza",
        districts: [
            { name: "Ilemema", municipals: ["Ilemela DC"] },
            { name: "Kwimba", municipals: ["Kwimba DC"] },
            { name: "Sengerema", municipals: ["Sengerema DC", "Buchosa DC"] },
            { name: "Nyamagana", municipals: ["Mwanza Jiji"] },
            { name: "Magu", municipals: ["Magu DC"] },
            { name: "Ukerewe", municipals: ["Ukerewe DC"] },
            { name: "Misungwi", municipals: ["Misungwi DC"] }
        ]
    },
    {
        name: "Njombe",
        districts: [
            { name: "Njombe", municipals: ["Njombe DC", "Njombe Mji", "Makambako Mji"] },
            { name: "Ludewa", municipals: ["Ludewa DC"] },
            { name: "Wangingombe", municipals: ["Wangingombe DC"] },
            { name: "Makete", municipals: ["Makete DC"] }
        ]
    },
    {
        name: "Pwani",
        districts: [
            { name: "Bagamoyo", municipals: ["Arusha Jiji"] }, // check
            { name: "Mkuranga", municipals: ["Arusha DC", "Meru DC"] }, // check
            { name: "Rufiji", municipals: ["Ngorongoro DC"] }, // check
            { name: "Mafia", municipals: ["Makete DC"] }, // check
            { name: "Kibaha", municipals: ["Kibaha DC", "Kibaha Mji"] },
            { name: "Kisarawe", municipals: ["Kisarawe DC"] },
            { name: "Kibiti", municipals: ["Kibiti DC"] }
        ]
    },
    {
        name: "Rukwa",
        districts: [
            { name: "Sumbawanga", municipals: ["Sumbawanga DC", "Sumbawanga MC"] },
            { name: "Nkasi", municipals: ["Nkasi DC"] },
            { name: "Kalambo", municipals: ["Kalambo DC"] }
        ]
    },
    {
        name: "Ruvuma",
        districts: [
            { name: "Namtumbo", municipals: ["Namtumbo DC"] },
            { name: "Mbinga", municipals: ["Mbinga DC", "Mbinga Mji"] },
            { name: "Nyasa", municipals: ["Nyasa DC"] },
            { name: "Tunduru", municipals: ["Tunduru DC"] },
            { name: "Songea", municipals: ["Songea MC", "Madaba DC", "Songea DC"] }
        ]
    },
    {
        name: "Shinyanga",
        districts: [
            { name: "Kishapu", municipals: ["Kishapu DC"] },
            { name: "Kahama", municipals: ["Kahama Mji", "Ushetu DC", "Msalala DC"] },
            { name: "Shinyanga", municipals: ["Shinyanga MC", "Shinyanga DC"] }
        ]
    },
    {
        name: "Simiyu",
        districts: [
            { name: "Mkalama", municipals: ["Mkalama DC"] },
            { name: "Manyoni", municipals: ["Manyoni DC", "Itigi DC"] },
            { name: "Singida", municipals: ["Singida MC", "Singida DC"] },
            { name: "Ikungi", municipals: ["Ikungi DC"] },
            { name: "Iramba", municipals: ["Iramba DC"] }
        ]
    },
    {
        name: "Songwe",
        districts: [
            { name: "Songwe", municipals: ["Songwe DC"] },
            { name: "Ileje", municipals: ["Ileje DC"] },
            { name: "Mbozi", municipals: ["Mbozi DC"] },
            { name: "Momba", municipals: ["Tunduma Mji", "Momba DC"] }
        ]
    },
    {
        name: "Tabora",
        districts: [
            { name: "Nzega", municipals: ["Nzega DC", "Nzega Mji"] },
            { name: "Kaliua", municipals: ["Kaliua DC"] },
            { name: "Igunga", municipals: ["Igunga DC"] },
            { name: "Sikonge", municipals: ["Sikonge DC"] },
            { name: "Tabora", municipals: ["Tabora MC"] },
            { name: "Urambo", municipals: ["Urambo DC"] },
            { name: "Uyui", municipals: ["Tabora/Uyui DC"] }
        ]
    },
    {
        name: "Tanga",
        districts: [
            { name: "Tanga", municipals: ["Arusha Jiji"] }, // check
            { name: "Muheza", municipals: ["Arusha DC", "Meru DC"] }, // check
            { name: "Mkinga", municipals: ["Ngorongoro DC"] }, // check
            { name: "Pangani", municipals: ["Longido DC"] }, // check
            { name: "Handeni", municipals: ["Handeni Mji", "Handeni DC"] },
            { name: "Korogwe", municipals: ["Korogwe Mji", "Korogwe DC"] },
            { name: "Kilindi", municipals: ["Kilindi DC"] },
            { name: "Lushoto", municipals: ["Lushoto DC", "Bumbuli DC"] }
        ]
    },
]