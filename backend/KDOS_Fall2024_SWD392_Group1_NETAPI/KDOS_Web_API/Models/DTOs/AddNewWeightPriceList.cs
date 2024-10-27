namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewWeightPriceList
    {
        required public float MinRange { get; set; }
        required public float MaxRange { get; set; }
        required public float Price { get; set; }
    }
}
