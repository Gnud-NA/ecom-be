import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { USPSGetRateDto } from "@src/ecom/payment/dto/payment.dto";
import { parseXMLtoJSON } from "@src/utils";
import axios from "axios";
import * as USPS from "usps-webtools";

@Injectable()
export class ShippingService {
    private usps: USPS;
    private uspsBaseUrl = "";
    private uspsUserId = ""; // Thay bằng User ID của bạn

    constructor(private configService: ConfigService) {
        console.log(this.configService.get("USPS_SERVER"));
        this.uspsBaseUrl = this.configService.get("USPS_SERVER");
        this.uspsUserId = this.configService.get("USPS_USER_ID");
    }

    // async getShippingRate({ originZip, destinationZip, weight }: USPSGetRateDto) {
    //     const packageDetails = {
    //         service: "PRIORITY", // Loại dịch vụ
    //         zipOrigination: originZip,
    //         zipDestination: destinationZip,
    //         pounds: Math.floor(weight),
    //         ounces: (weight % 1) * 16, // Chuyển đổi phần thập phân thành ounces
    //         container: "RECTANGULAR",
    //         size: "REGULAR",
    //     };

    //     try {
    //         const rate = await this.usps.rate(packageDetails);
    //         return rate;
    //     } catch (error) {
    //         throw new Error(`USPS API Error: ${error.message}`);
    //     }
    // }

    async getShippingRate({ originZip, destinationZip, weight }: USPSGetRateDto) {
        const xmlRequest = `
            <RateV4Request USERID="remembernguyen" PASSWORD="Huynhtu03@">
                <Revision>2</Revision>
                <Package ID="1ST">
                <Service>PRIORITY</Service>
                <ZipOrigination>${originZip}</ZipOrigination>
                <ZipDestination>${destinationZip}</ZipDestination>
                <Pounds>${Math.floor(weight)}</Pounds>
                <Ounces>${(weight % 1) * 16}</Ounces>
                <Container>RECTANGULAR</Container>
                <Size>REGULAR</Size>
                <Machinable>TRUE</Machinable>
                </Package>
            </RateV4Request>
            `; //USERID="${this.uspsUserId}"
        try {
            const response = await axios.get(this.uspsBaseUrl, {
                params: {
                    API: "RateV4",
                    XML: xmlRequest,
                },
            });
            const result = parseXMLtoJSON(response.data);
            return result;
        } catch (error) {
            throw new Error(`USPS API Error: ${error.message}`);
        }
    }
}
