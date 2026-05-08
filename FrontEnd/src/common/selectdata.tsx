import { useState } from "react";
import Select from 'react-select';
import { imagesData } from "./commonimages";

//formelements
export function Brand() {
  const [value, setvalue] = useState<any>("");

  const handleOnchange = () => {
    setvalue(value);
  };
  const Optioncategory1 = [
    {
     value:"br",
     label:"Brazil"
    },
    {
     value:"cz",
     label:"Czech Republic"
    },
    {
     value:"de",
     label:"Germany"
    },
    {
     value:"pl",
     label:"Poland"
    },
  ];
  return (
    <Select
			onChange={handleOnchange}
			options={Optioncategory1}
      classNamePrefix='Select2' className="multi-select"
			isSearchable
			placeholder="Brazil"
   isMulti
 />
  );
}

export function Customize() {
  const [value, setvalue] = useState<any>("");

  const handleOnchange = () => {
    setvalue(value);
  };
  const Optioncategory1 = [
    {
      value: "br",
      label: "Brazil",
    },
    {
      value: "cz",
      label: "Czech Republic",
    },
    {
      value: "de",
      label: "Germany",
    },
    {
      value: "pl",
      label: "Poland",
    },
  ];
  return (
    <Select
			onChange={handleOnchange}
			options={Optioncategory1}
      classNamePrefix='Select2' className="multi-select"
			isSearchable
			placeholder="Brazil"
	/>
  );
}

export function Disabled() {
  const [value, setvalue] = useState<any>("");

  const handleOnchange = () => {
    setvalue(value);
  };
  const Optioncategory1 = [
    {
      value: "br",
      label: "Brazil",
    },
    {
      value: "cz",
      label: "Czech Republic",
    },
    {
      value: "de",
      label: "Germany",
    },
    {
      value: "pl",
      label: "Poland",
    },
  ];
  return (
    <Select
			onChange={handleOnchange}
			options={Optioncategory1}
      classNamePrefix='Select2' className="multi-select"
			isSearchable
			placeholder="Brazil"
      isDisabled
	/>
  
  );
}

//advancedforms
export const options = [
  { value: "eg1", label: " eg1" },
  { value: "saab1", label: " Saab" },
  { value: "eg2", label: " eg2" },
  { value: "eg3", label: " eg3" },
  { value: "eg4", label: " eg1" },
  { value: "saab2", label: " Saab" },
  { value: "eg5", label: " eg2" },
  { value: "eg6", label: " eg3" },
  { value: "eg7", label: " eg1" },
  { value: "saab3", label: " Saab" },
  { value: "eg8", label: " eg2" },
  { value: "eg9", label: " eg3" },
  { value: "eg10", label: " eg1" },
  { value: "saab4", label: " Saab" },
  { value: "eg11", label: " eg2" },
  { value: "eg12", label: " eg3" },
];

const optionOptgroupSupport = [
  { label: "Audi", value: "Audi" },
  { value: "BMW", label: "BMW" },
  { value: "volkswagen", label: "volkswagen" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "mitsubishi", label: "mitsubishi" },
  { value: "hyundai", label: "hyundai" },
  { value: "fiat", label: "fiat" },
];

const objectArray = [
  { value: "BMW", selected: "true", label: "BMW" },
  { value: "volkswagen", label: "volkswagen" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "mitsubishi", label: "mitsubishi" },
  { value: "hyundai", label: "hyundai" },
  { value: "fiat", label: "fiat" },
];

export const groupedOptions:any = [
  {
    label: "BMW",
    options: objectArray,
  },
  {
    label: "volkswagen",
    options: optionOptgroupSupport,
  },
];

//formlayouts
export const Optioncategory1 = [
  {
    value: "category-1",
    label: "January",
  },
  {
    value: "category-2",
    label: "February",
  },
  {
    value: "category-3",
    label: "March",
  },
  {
    value: "category-4",
    label: "April",
  },
  {
    value: "category-5",
    label: "May",
  },
  
];

export const OptionYear = [
  {
    value: "category-1",
    label: "2018",
  },
  {
    value: "category-2",
    label: "2019",
  },
  {
    value: "category-3",
    label: "2020",
  },
  {
    value: "category-4",
    label: "2021",
  },
  {
    value: "category-5",
    label: "2022",
  },
];

//form validation

//ServerSideValidation
export const optionselectyear = [
  {
    value: "Choose...-1",
    label: "Choose...",
  },
  {
    value: "Mountain-1",
    label: "Mountain ",
  },
  {
    value: "Wyoming-2",
    label: "Wyoming",
  },
  {
    value: "Utah-3",
    label: "Utah",
  },
  {
    value: "Montana-4",
    label: "Montana",
  },
  {
    value: "Colorado-6",
    label: "Colorado",
  },
  {
    value: "Mountain Time Zone-7",
    label: "Mountain Time Zone",
  },
  {
    value: "Wyoming-8",
    label: "Wyoming",
  },
];



//CustomValidation

export const optionCustom = [
  {
    value: "Choose...-1",
    label: "Choose...",
  },
  {
    value: "Mountain Time-2",
    label: "Mountain Time",
  },
  {
    value: "Wyoming-3",
    label: "Wyoming",
  },
  {
    value: "Utah-4",
    label: "Utah",
  },
  {
    value: "Montana-5",
    label: "Montana",
  },
  {
    value: "Colorado-6",
    label: "Colorado",
  },
  {
    value: "Mountain Time Zone-7",
    label: "Mountain Time Zone",
  },
  {
    value: "Wyoming-8",
    label: "Wyoming",
  },
];


//DefaultValidation

export const optiondefault = [
  {
    value: "Choose...-1",
    label: "Choose...",
  },
  {
    value: "MountainZone-2",
    label: "MountainZone",
  },
  {
    value: "Wyoming-3",
    label: "Wyoming",
  },
  {
    value: "Utah-4",
    label: "Utah",
  },
  {
    value: "Montana-5",
    label: "Montana",
  },
  {
    value: "Colorado-6",
    label: "Colorado",
  },
  {
    value: "Mountain Time Zone-7",
    label: "Mountain Time Zone",
  },
  {
    value: "Wyoming-8",
    label: "Wyoming",
  },
];


//Tooltips
export const optionTooltips = [
  {
    value: "Choose...-1",
    label: "Choose...",
  },
  {
    value: "Time Zone-2",
    label: "Time Zone",
  },
  {
    value: "Wyoming-3",
    label: "Wyoming",
  },
  {
    value: "Utah-4",
    label: "Utah",
  },
  {
    value: "Montana-5",
    label: "Montana",
  },
  {
    value: "Colorado-6",
    label: "Colorado",
  },
  {
    value: "Mountain Time Zone-7",
    label: "Mountain Time Zone",
  },
  {
    value: "Wyoming-8",
    label: "Wyoming",
  },
];
  


export const objectArraysingle = [
  { label: "Choose...", value: "Choose..." },
  { label: "Mountain Time Zone", value: "Mountain Time Zone" },
  { label: "Wyoming", value: "Wyoming" },
  { label: "Utah", value: "Utah" },
  { label: "Montana", value: "Montana" },
  { label: "Colorado", value: "Mountain Time Zone" },
  { label: "Wyoming", value: "Wyoming" },
  { label: "Utah", value: "Utah" },
];

//mailsettings

export const OptionLanguage = [
  {
    value: "category-2",
    label: "Us English",
  },
  {
    value: "category-3",
    label: "Arabic",
  },
  {
    value: "category-4",
    label: "Korean",
  },
];

export const OptionTimezone = [
  {
    value: "category-1",
    label: "(GMT-11:00) Midway Island, Samoa",
  },
  {
    value: "category-2",
    label: "(GMT-10:00) Hawaii-Aleutian",
  },
  {
    value: "category-3",
    label: "(GMT-10:00) Hawaii",
  },
  {
    value: "category-4",
    label: "(GMT-09:30) Marquesas Islands",
  },
  {
    value: "category-5",
    label: "(GMT-09:00) Gambier Islands",
  },

  {
    value: "category-6",
    label: "(GMT-09:00) Alaska",
  },
  {
    value: "category-7",
    label: " (GMT-08:00) Tijuana, Baja California",
  },
  {
    value: "category-8",
    label: " (GMT-08:00) Pitcairn Islands",
  },
  {
    value: "category-9",
    label: "(GMT-08:00) Pacific Time (US & Canada)",
  },
  {
    value: "category-10",
    label: "(GMT-07:00) Mountain Time (US & Canada)",
  },
  {
    value: "category-11",
    label: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
  },
  {
    value: "category-12",
    label: "(GMT-07:00) Arizona",
  },
  {
    value: "category-13",
    label: "(GMT-06:00) Saskatchewan, Central America",
  },
  {
    value: "category-14",
    label: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
  },
  {
    value: "category-15",
    label: "(GMT-06:00) Easter Island",
  },
  {
    value: "category-16",
    label: "(GMT-06:00) Central Time (US & Canada)",
  },
  {
    value: "category-17",
    label: "(GMT-05:00) Eastern Time (US & Canada)",
  },
  {
    value: "category-18",
    label: " (GMT-05:00) Cuba",
  },
  {
    value: "category-19",
    label: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
  },
  {
    value: "category-20",
    label: " (GMT-04:30) Caracas",
  },
  {
    value: "category-21",
    label: "(GMT-04:00) Santiago",
  },
  {
    value: "category-22",
    label: "(GMT-04:00) La Paz",
  },
  {
    value: "category-23",
    label: "(GMT-04:00) Faukland Islands",
  },
  {
    value: "category-24",
    label: "(GMT-04:00) Brazil",
  },
  {
    value: "category-25",
    label: "(GMT-04:00) Atlantic Time (Goose Bay)",
  },
  {
    value: "category-26",
    label: "(GMT-04:00) Atlantic Time (Canada)",
  },
  {
    value: "category-27",
    label: "(GMT-03:30) Newfoundland",
  },
  {
    value: "category-28",
    label: "(GMT-03:00) UTC-3",
  },
  {
    value: "category-29",
    label: "(GMT-03:00) Montevideo",
  },
  {
    value: "category-30",
    label: "(GMT-03:00) Miquelon, St. Pierre",
  },
  {
    value: "category-31",
    label: "(GMT-03:00) Greenland",
  },
  {
    value: "category-32",
    label: "(GMT-03:00) Buenos Aires",
  },
  {
    value: "category-33",
    label: "(GMT-03:00) Brasilia",
  },
  {
    value: "category-34",
    label: "(GMT-02:00) Mid-Atlantic",
  },
  {
    value: "category-35",
    label: "(GMT-01:00) Cape Verde Is.",
  },
  {
    value: "category-36",
    label: "(GMT-01:00) Azores",
  },
  {
    value: "category-37",
    label: " (GMT) Greenwich Mean Time : Belfast",
  },
  {
    value: "category-38",
    label: "(GMT) Greenwich Mean Time : Dublin",
  },
  {
    value: "category-39",
    label: " (GMT) Greenwich Mean Time : Lisbon",
  },
  {
    value: "category-40",
    label: " (GMT) Greenwich Mean Time : London",
  },
  {
    value: "category-41",
    label: "(GMT) Monrovia, Reykjavik",
  },
  {
    value: "category-42",
    label: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm,Vienna",
  },
  {
    value: "category-43",
    label: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana,Prague",
  },
  {
    value: "category-44",
    label: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",
  },
  {
    value: "category-45",
    label: "(GMT+01:00) West Central Africa",
  },
  {
    value: "category-46",
    label: "(GMT+01:00) Windhoek",
  },
  {
    value: "category-47",
    label: "(GMT+02:00) Beirut",
  },
  {
    value: "category-48",
    label: "(GMT+02:00) Cairo",
  },
  {
    value: "category-49",
    label: "(GMT+02:00) Gaza",
  },
  {
    value: "category-50",
    label: "(GMT+02:00) Harare, Pretoria",
  },
  {
    value: "category-51",
    label: "(GMT+02:00) Jerusalem",
  },
  {
    value: "category-52",
    label: "(GMT+02:00) Minsk",
  },

  {
    value: "category-52",
    label: "(GMT+02:00) Syria",
  },

  {
    value: "category-53",
    label: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
  },

  {
    value: "category-54",
    label: "(GMT+03:00) Nairobi",
  },

  {
    value: "category-55",
    label: "(GMT+03:30) Tehran",
  },

  {
    value: "category-56",
    label: "(GMT+04:00) Abu Dhabi, Muscat",
  },

  {
    value: "category-57",
    label: "(GMT+04:00) Yerevan",
  },

  {
    value: "category-58",
    label: "(GMT+04:30) Kabul",
  },

  {
    value: "category-59",
    label: "(GMT+05:00) Ekaterinburg",
  },

  {
    value: "category-60",
    label: "(GMT+05:00) Tashkent",
  },

  {
    value: "category-61",
    label: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  },

  {
    value: "category-62",
    label: "(GMT+05:45) Kathmandu",
  },

  {
    value: "category-63",
    label: "(GMT+06:00) Astana, Dhaka",
  },

  {
    value: "category-64",
    label: "(GMT+06:00) Novosibirsk",
  },

  {
    value: "category-65",
    label: "(GMT+06:30) Yangon (Rangoon)",
  },

  {
    value: "category-66",
    label: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
  },

  {
    value: "category-676",
    label: "(GMT+07:00) Krasnoyarsk",
  },

  {
    value: "category-68",
    label: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
  },

  {
    value: "category-69",
    label: "(GMT+08:00) Irkutsk, Ulaan Bataar",
  },

  {
    value: "category-70",
    label: "(GMT+08:00) Perth",
  },

  {
    value: "category-71",
    label: "(GMT+08:45) Eucla",
  },

  {
    value: "category-72",
    label: "(GMT+09:00) Osaka, Sapporo, Tokyo",
  },

  {
    value: "category-73",
    label: "(GMT+09:00) Seoul",
  },

  {
    value: "category-74",
    label: "(GMT+09:00) Yakutsk",
  },

  {
    value: "category-75",
    label: "(GMT+09:30) Adelaide",
  },

  {
    value: "category-76",
    label: "(GMT+09:30) Darwin",
  },

  {
    value: "category-77",
    label: "(GMT+10:00) Brisbane",
  },

  {
    value: "category-78",
    label: "(GMT+10:00) Hobart",
  },

  {
    value: "category-79",
    label: "(GMT+10:00) Vladivostok",
  },

  {
    value: "category-80",
    label: "(GMT+10:30) Lord Howe Island",
  },

  {
    value: "category-81",
    label: "(GMT+11:00) Solomon Is., New Caledonia",
  },

  {
    value: "category-82",
    label: "(GMT+11:00) Magadan",
  },

  {
    value: "category-83",
    label: "(GMT+11:30) Norfolk Island",
  },

  {
    value: "category-84",
    label: "(GMT+12:00) Anadyr, Kamchatka",
  },

  {
    value: "category-85",
    label: "(GMT+12:00) Auckland, Wellington",
  },

  {
    value: "category-86",
    label: "(GMT+12:00) Fiji, Kamchatka, Marshall Is.",
  },

  {
    value: "category-87",
    label: "(GMT+12:45) Chatham Islands",
  },

  {
    value: "category-88",
    label: "(GMT+13:00) Nuku'alofa",
  },

  {
    value: "category-89",
    label: "(GMT+14:00) Kiritimati",
  },
];

//end mailsettings

//ecommerce/shop

//Brand
export const Optioncategory2 = [
  {
    value: "category-2",
    label: "Wallmart",
  },
  {
    value: "category-3",
    label: "Catseye",
  },
  {
    value: "category-4",
    label: "Catseye",
  },
  {
    value: "category-5",
    label: "Textmart",
  },
];

//Type
export const OptionType = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-2",
    label: "Small",
  },
  {
    value: "category-4",
    label: "Medium",
  },
  {
    value: "category-5",
    label: "Large",
  },
  {
    value: "category-6",
    label: "Extra Large",
  },
];

//Mens
export const OptionMens:any = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-2",
    label: "Foot wear",
  },
  {
    value: "category-3",
    label: "Top wear",
  },
  {
    value: "category-4",
    label: "Bootom wear",
  },
  {
    value: "category-5",
    label: "Men's Groming",
  },
  {
    value: "category-6",
    label: "Accessories",
  },
  
];
 
//Women
export const OptionWomen = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-0",
    label: "Western wear",
  },
  {
    value: "category-2",
    label: "Foot wear",
  },
  {
    value: "category-3",
    label: "Top wear",
  },
  {
    value: "category-4",
    label: "Bootom wear",
  },
  {
    value: "category-5",
    label: "Beuty Groming",
  },
  {
    value: "category-6",
    label: "Accessories",
  },
  {
    value: "category-7",
    label: "jewellery",
  },
];

//Baby & Kids
export const OptionBabyKids = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-2",
    label: "Boys clothing",
  },
  {
    value: "category-3",
    label: "girls Clothing",
  },
  {
    value: "category-4",
    label: "Toys",
  },
  {
    value: "category-5",
    label: "Baby Care",
  },
  {
    value: "category-6",
    label: "Kids footwear",
  },
];

//Electronics
export const OptionElectronics = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-2",
    label: "Mobiles",
  },
  {
    value: "category-3",
    label: "Laptops",
  },
  {
    value: "category-4",
    label: "Gaming & Accessories",
  },
  {
    value: "category-5",
    label: "Health care Appliances",
  },
  
];

//SportBooksMore;
export const OptionSportBooksMore = [
  {
    value: "category-1",
    label: "--Select--",
  },
  {
    value: "category-2",
    label: "Stationery",
  },
  {
    value: "category-3",
    label: "Books",
  },
  {
    value: "category-4",
    label: "Gaming",
  },
  {
    value: "category-5",
    label: "Music",
  },
  {
    value: "category-6",
    label: "Exercise & fitness",
  },
];

//edit post
export function Language() {
  const [value, setvalue] = useState<any>("");

  const handleOnchange = () => {
    setvalue(value);
  };
  const Optioncategorydata = [
    
    {
      value:"Select",
      label:"Select"
     },
    {
      value:"IT",
      label:"IT"
     },
     {
     value:"Language",
     label:"Language"
    },
    {
     value:"Science",
     label:"Science"
    },
    {
     value:"Health",
     label:"Health"
    },
    {
     value:"Humanitieshu",
     label:"Humanities"
    },
    {
      value:"Business",
      label:"Business"
     },
     {
      value:"Maths",
      label:"Maths"
     },
     {
      value:"Marketing",
      label:"Marketing"
     },
  ];
  return (
    <Select
			onChange={handleOnchange}
			options={Optioncategorydata}
      classNamePrefix='Select2' className="multi-select"
 />
  );
}

export const Instructordata=[
  {value:'Select', label:'Select'},
  {value:'Pedro Cox', label:'Pedro Cox'},
  {value:'Vera Guzman', label:'Vera Guzman'},
  {value:'Glenda Long', label:'Glenda Long'},
  {value:'Joel Anderson', label:'Joel Anderson'},
  {value:'Blanche Henderson', label:'Blanche Henderson'}
];

export const DefaultData = [
  { value: "Choice 1", label: "Choice 1" },
  { value: "Choice 2", label: "Choice 2" },
  { value: "Choice 3", label: "Choice 3" },
  { value: "Choice 4", label: "Choice 4" },
  { value: "Choice 5", label: "Choice 5" },
  { value: "Choice 6", label: "Choice 6", disabled: true },
];

export const GroupData = [
  {
    label: 'UK',
    options: [
      { label: 'London', value: 'London' },
      { label: 'Manchester', value: 'Manchester' },
      { label: 'Liverpool', value: 'Liverpool' },
    ],
  },
  {
    label: 'FR',
    options: [
      { label: 'Paris', value: 'Paris' },
      { label: 'Lyon', value: 'Lyon' },
      { label: 'Marseille', value: 'Marseille' },
    ],
  },
  {
    label: 'DE',
    disabled: true,
    options: [
      { label: 'Hamburg', value: 'Hamburg' },
      { label: 'Munich', value: 'Munich' },
      { label: 'Berlin', value: 'Berlin' },
    ],
  },
  {
    label: 'US',
    options: [
      { label: 'New York', value: 'New York' },
      { label: 'Washington', value: 'Washington', disabled: true },
      { label: 'Michigan', value: 'Michigan' },
    ],
  },
  {
    label: 'SP',
    options: [
      { label: 'Madrid', value: 'Madrid' },
      { label: 'Barcelona', value: 'Barcelona' },
      { label: 'Malaga', value: 'Malaga' },
    ],
  },
  {
    label: 'CA',
    options: [
      { label: 'Montreal', value: 'Montreal' },
      { label: 'Toronto', value: 'Toronto' },
      { label: 'Vancouver', value: 'Vancouver' },
    ],
  },
];

export const OptionData = [
  { value: "Zero", label: "Zero" },
  { value: "Lebel 1", label: "Lebel 1" },
  { value: "Lebel 2", label: "Lebel 2" },
  { value: "Lebel 3", label: "Lebel 3" },
  { value: "Lebel 4", label: "Lebel 4" },
  { value: "Lebel 5", label: "Lebel 5" },
];

export const Preference = [
  { value: 'One', label: 'One' },
  { value: 'Two', label: 'Two' },
  { value: 'Three', label: 'Three' },
  { value: 'Four', label: 'Four' },
  { value: 'Fifth', label: 'Fifth' }
];

export const BasicSelect = [
  { value: 'Selection 1', label: 'Selection 1' },
  { value: 'Selection 2', label: 'Selection 2' },
  { value: 'Selection 3', label: 'Selection 3' },
  { value: 'Selection 4', label: 'Selection 4' },
  { value: 'Selection 5', label: 'Selection 5' }
]

export const MaxData = [
  { value: 'Andrew', label: 'Andrew' },
  { value: 'Maya', label: 'Maya' },
  { value: 'Brodus Axel', label: 'Brodus Axel' },
  { value: 'Goldhens', label: 'Goldhens' },
  { value: 'Angelina', label: 'Angelina' }
];

export const MultipleSelect = [
  { value: 'Multiple 1', label: 'Multiple 1' },
  { value: 'Multiple 2', label: 'Multiple 2' },
  { value: 'Multiple 3', label: 'Multiple 3' },
  { value: 'Multiple 4', label: 'Multiple 4' },
  { value: 'Multiple 5', label: 'Multiple 5' }
]

export const TemptingData = [
  { value: 'Andrew', label: (<div><img src={imagesData('select1')} alt="Option 1" className="me-2 me-2" />Andrew</div>) },
  { value: 'Maya', label: (<div><img src={imagesData('select2')} alt="Option 1" className="me-2" />Maya</div>) },
  { value: 'Brodus Axel', label: (<div><img src={imagesData('select3')} alt="Option 1" className="me-2" />Brodus Axel</div>) },
  { value: 'Goldhens', label: (<div> <img src={imagesData('select4')} alt="Option 1" className="me-2" />Goldhens</div>) },
  { value: 'Angelina', label: (<div><img src={imagesData('select5')} alt="Option 1" className="me-2" />Angelina</div>) }
];

export const Countrypreference = [
  { value: 'Country', label: 'Country' },
  { value: '...', label: '...' },
];

export const Statepreference = [
  { value: 'State', label: 'State' },
  { value: '...', label: '...' },
];

export const Country = [
  { value: "USA", label: "USA" },
  { value: "Italy", label: "Italy" },
  { value: "Australia", label: "Australia" },
  { value: "England", label: "England" },
  { value: "Spain", label: "Spain" },
]

export const State = [
  { value: "California", label: "California" },
  { value: "Alaska", label: "Alaska" },
  { value: "Colorado", label: "Colorado" },
  { value: "Arizona", label: "Arizona" },
  { value: "Delaware", label: "Delaware" },
]
export const dropproduct = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
]