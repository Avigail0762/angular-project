export class Gift{
    name!: string;
    donor?: string;
    price!: number;
    description?: string;
    donorId!: number;
    BuyersNumber: number = 0;
    category?: string;
    winnerTicketId?: number; 
    isDrawn: boolean = false;
}