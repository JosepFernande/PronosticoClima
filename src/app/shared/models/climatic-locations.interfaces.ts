export interface ClimaticLocation {
    id: number,
    name: string,
    latitude: number
    longitude: number
    days: 1 | 3 | 7 | null
}