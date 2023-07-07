export interface CountryCode {
    value: string;
    label: string;
    flag: string;
}

export const countryCodeList: CountryCode[] = [
    { value: '+1', label: 'United States', flag: '🇺🇸' },
    { value: '+44', label: 'United Kingdom', flag: '🇬🇧' },
    // Add more country codes here
];
